import {
  User,
  LoginUser,
  IMailValidator,
  IPasswordValidator,
  IFindUserByEmailRepository,
} from '../../';
import { IEncrypter } from '../../../../utils';

export class LoginUserUseCase {
  constructor(
    private readonly mailValidator: IMailValidator,
    private readonly passwordValidator: IPasswordValidator,
    private readonly encrypter: IEncrypter,
    private readonly findUserByEmailRepository: IFindUserByEmailRepository
  ) {}

  async execute({ email, password }: LoginUser): Promise<User> {
    //Check if the email has not been provided
    if (email === undefined) {
      throw new Error();
    }

    //Check if the email is empty
    if (email.trim() === '') {
      throw new Error();
    }

    //Check if the mail is valid
    const isMailValid = this.mailValidator.validateMail(email);

    if (!isMailValid) {
      throw new Error();
    }

    //Check if the password has not been provided
    if (password === undefined) {
      throw new Error();
    }

    //Check if the password is empty
    if (password.trim() === '') {
      throw new Error();
    }

    //Check if the password is valid
    const isPasswordValid = this.passwordValidator.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error();
    }

    //Fetch user
    const user = await this.findUserByEmailRepository.findUserByEmail(email);

    //Check if the user does not exist
    if (!user) {
      throw new Error();
    }

    //Check if the passwords are different
    const comparisonResult = await this.encrypter.compareHash(
      password,
      user.getPassword
    );

    if (!comparisonResult) {
      throw new Error();
    }

    return user;
  }
}
