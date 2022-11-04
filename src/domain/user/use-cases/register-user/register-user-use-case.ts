import { ICodeGenerator, IEncrypter, IMailProvider } from '../../../../utils';
import { User, IRegisterUserRepository, IMailValidator } from '../../';

export class RegisterUserUseCase {
  constructor(
    private mailValidator: IMailValidator,
    private encrypter: IEncrypter,
    private registerUserRepository: IRegisterUserRepository,
    private mailProvider: IMailProvider,
    private codeGenerator: ICodeGenerator
  ) {}

  async execute(user: User): Promise<User> {
    //Check if the mail is valid
    const isMailValid = this.mailValidator.validateMail(user.getEmail);

    if (!isMailValid) {
      throw new Error();
    }

    //Create password hash
    const hashPassword = this.encrypter.createHash(user.getPassword);
    user.setPassword = hashPassword;

    //Register the user
    await this.registerUserRepository.registerUser(user);

    //Generate the account confirmation code to send in the email
    const code = this.codeGenerator.generateCode();

    //Send account confirmation email
    await this.mailProvider.sendMail({
      to: {
        name: user.getName,
        email: user.getEmail,
      },
      from: {
        name: 'Heroes',
        email: 'dias.math0@gmail.com',
      },
      subject: 'Confirmação de Email',
      body: `Olá ${user.getName}, confirme seu email para entrar no mundo dos heroes\n\nCódigo para confirmação: ${code}`,
    });

    return user;
  }
}
