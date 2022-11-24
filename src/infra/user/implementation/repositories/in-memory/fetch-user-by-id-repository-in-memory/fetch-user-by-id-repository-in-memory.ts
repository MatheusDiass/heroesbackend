import { IFetchUserByIdRepository, User } from '../../../../../../domain/user';
import { UserAdapter } from '../../../../adapters';
import { database } from '../../../../../database-in-memory';

export class FetchUserByIdRepositoryInMemory
  implements IFetchUserByIdRepository
{
  async fetchUserById(id: number): Promise<User | undefined> {
    const user = database.users.find((user: any) => user.user_id === id);

    if (!user) {
      return undefined;
    }

    return UserAdapter.fromJson(user);
  }
}
