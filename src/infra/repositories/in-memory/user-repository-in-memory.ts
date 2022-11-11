import {
  IConfirmRegistrationRepository,
  IFetchUserByIdRepository,
  IFetchUserByNicknameRepository,
  IFindUserByEmailRepository,
  IRegisterUserRepository,
  User,
} from '../../../domain/user';
import { UserAdapter } from '../../adapters';

export class UserRepositoryInMemory
  implements
    IRegisterUserRepository,
    IConfirmRegistrationRepository,
    IFetchUserByIdRepository,
    IFindUserByEmailRepository,
    IFetchUserByNicknameRepository
{
  private users: any = [];

  async registerUser(user: User): Promise<void> {
    this.users.push(UserAdapter.toJson(user));
  }

  async confirmRegistration(userId: number): Promise<void> {
    const user = this.users.find((user: any) => user.user_id === userId);

    user.user_confirmationcode = 0;
  }

  async fetchUserById(id: number): Promise<User | undefined> {
    const user = this.users.find((user: any) => user.user_id === id);

    if (!user) {
      return undefined;
    }

    return UserAdapter.fromJson(user);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user: any) => user.user_email === email);

    if (!user) {
      return undefined;
    }

    return UserAdapter.fromJson(user);
  }

  async fetchUserByNickname(nickname: string): Promise<User | undefined> {
    const user = this.users.find(
      (user: any) => user.user_nickname === nickname
    );

    if (!user) {
      return undefined;
    }

    return UserAdapter.fromJson(user);
  }
}
