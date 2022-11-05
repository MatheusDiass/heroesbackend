import {
  User,
  LoginUser,
  IMailValidator,
  IPasswordValidator,
  IFindUserByEmailRepository,
} from '../../';

export class LoginUserUseCase {
  constructor(
    private readonly mailValidator: IMailValidator,
    private readonly passwordValidator: IPasswordValidator,
    private readonly findUserByEmailRepository: IFindUserByEmailRepository
  ) {}

  async execute({ email, password }: LoginUser): Promise<User> {
    //Check if the mail has not been provided
    if (email.trim() === '') {
      throw new Error();
    }

    //Check if the mail is valid
    const isMailValid = this.mailValidator.validateMail(email);

    if (!isMailValid) {
      throw new Error();
    }

    //Check if the password has not been provided
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
    if (user.getPassword !== password) {
      throw new Error();
    }

    return user;
  }
}
