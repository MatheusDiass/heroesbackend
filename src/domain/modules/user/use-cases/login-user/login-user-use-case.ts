import {
  User,
  LoginUser,
  IMailValidator,
  IPasswordValidator,
  IFetchUserByEmailRepository,
} from '../../';
import { IEncrypter } from '../../../../../utils';
import {
  MissingParameterError,
  EmptyParameterError,
  UserNotFoundError,
  IncorrectEmailFormatError,
  IncorrectPasswordFormatError,
  IncorrectPasswordError,
} from '../../../../errors';

export class LoginUserUseCase {
  constructor(
    private readonly mailValidator: IMailValidator,
    private readonly passwordValidator: IPasswordValidator,
    private readonly encrypter: IEncrypter,
    private readonly fetchUserByEmailRepository: IFetchUserByEmailRepository
  ) {}

  async execute({ email, password }: LoginUser): Promise<User> {
    //Check if the email has not been provided
    if (email === undefined) {
      throw new MissingParameterError('email');
    }

    //Check if the email is empty
    if (email.trim() === '') {
      throw new EmptyParameterError('email');
    }

    //Check if the mail is valid
    const isMailValid = this.mailValidator.validateMail(email);

    if (!isMailValid) {
      throw new IncorrectEmailFormatError();
    }

    //Check if the password has not been provided
    if (password === undefined) {
      throw new MissingParameterError('password');
    }

    //Check if the password is empty
    if (password.trim() === '') {
      throw new EmptyParameterError('password');
    }

    //Check if the password is valid
    const isPasswordValid = this.passwordValidator.validatePassword(password);

    if (!isPasswordValid) {
      throw new IncorrectPasswordFormatError();
    }

    //Fetch user
    const user = await this.fetchUserByEmailRepository.fetchUserByEmail(email);

    //Check if the user does not exist
    if (!user) {
      throw new UserNotFoundError();
    }

    //Check if the passwords are different
    const comparisonResult = await this.encrypter.compareHash(
      password,
      user.getPassword
    );

    if (!comparisonResult) {
      throw new IncorrectPasswordError();
    }

    return user;
  }
}