import { User } from '../../';
import { IFindUserByEmailRepository, LoginUser } from '../../';

export class LoginUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository
  ) {}

  async execute({ email, password }: LoginUser): Promise<User> {
    if (email.trim() === '') {
      throw new Error();
    }

    if (password.trim() === '') {
      throw new Error();
    }

    const user = await this.findUserByEmailRepository.findUserByEmail(email);

    if (!user) {
      throw new Error();
    }

    if (user.getPassword !== password) {
      throw new Error();
    }

    return user;
  }
}
