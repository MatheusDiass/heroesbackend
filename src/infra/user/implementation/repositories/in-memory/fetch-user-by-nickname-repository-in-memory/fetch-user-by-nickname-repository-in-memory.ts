import {
  IFetchUserByNicknameRepository,
  User,
} from '../../../../../../domain/user';
import { UserAdapter } from '../../../../adapters';
import { database } from '../../../../../database-in-memory';

export class FetchUserByNicknameRepositoryInMemory
  implements IFetchUserByNicknameRepository
{
  async fetchUserByNickname(nickname: string): Promise<User | undefined> {
    const user = database.users.find(
      (user: any) => user.user_nickname === nickname
    );

    if (!user) {
      return undefined;
    }

    return UserAdapter.fromJson(user);
  }
}
