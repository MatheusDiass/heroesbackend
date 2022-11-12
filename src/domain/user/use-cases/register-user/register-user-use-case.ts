import { ICodeGenerator, IEncrypter, IMailProvider } from '../../../../utils';
import {
  User,
  IRegisterUserRepository,
  IMailValidator,
  IPasswordValidator,
  IFetchUserByNicknameRepository,
} from '../../';

export class RegisterUserUseCase {
  constructor(
    private readonly mailValidator: IMailValidator,
    private readonly passwordValidator: IPasswordValidator,
    private readonly encrypter: IEncrypter,
    private readonly fetchUserByNicknameRepository: IFetchUserByNicknameRepository,
    private readonly registerUserRepository: IRegisterUserRepository,
    private readonly mailProvider: IMailProvider,
    private readonly codeGenerator: ICodeGenerator
  ) {}

  async execute(user: User): Promise<User> {
    let nicknameExists: User | undefined;

    //Check if the mail is valid
    const isMailValid = this.mailValidator.validateMail(user.getEmail);

    if (!isMailValid) {
      throw new Error();
    }

    //Check if the password is valid
    const isPasswordValid = this.passwordValidator.validatePassword(
      user.getPassword
    );

    if (!isPasswordValid) {
      throw new Error();
    }

    //Check if the nickname already exists
    if (user.getNickname) {
      nicknameExists =
        await this.fetchUserByNicknameRepository.fetchUserByNickname(
          user.getNickname
        );

      if (nicknameExists) {
        throw new Error();
      }
    }

    //Create password hash
    const hashPassword = await this.encrypter.createHash(user.getPassword);
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
