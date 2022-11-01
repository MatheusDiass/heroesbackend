import { User } from '../../';
import { IFindUserByEmailRepository, LoginUser } from '../../';

export class LoginUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository
  ) {}

  async execute({ email, password }: LoginUser): Promise<User> {
    //Check if the email has not been provided
    if (email.trim() === '') {
      throw new Error();
    }

    //Check if the password has not been provided
    if (password.trim() === '') {
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
