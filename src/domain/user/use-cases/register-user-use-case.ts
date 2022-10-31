import { ICodeGenerator, IEncrypter, IMailProvider } from '../../../utils';
import { User, IRegisterUserRepository } from '../';

export class RegisterUserUseCase {
  constructor(
    private encrypter: IEncrypter,
    private registerUserRepository: IRegisterUserRepository,
    private mailProvider: IMailProvider,
    private codeGenerator: ICodeGenerator
  ) {}

  async execute(user: User): Promise<User> {
    const hashPassword = this.encrypter.createHash(user.getPassword);
    user.setPassword = hashPassword;
    await this.registerUserRepository.registerUser(user);
    const code = this.codeGenerator.generateCode();
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
