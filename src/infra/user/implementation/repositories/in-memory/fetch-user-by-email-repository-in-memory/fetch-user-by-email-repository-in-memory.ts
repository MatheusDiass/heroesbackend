import {
  IFetchUserByEmailRepository,
  User,
} from '../../../../../../domain/user';
import { UserAdapter } from '../../../../adapters';
import { database } from '../../../../../database-in-memory';

export class FetchUserByEmailRepositoryInMemory
  implements IFetchUserByEmailRepository
{
  async fetchUserByEmail(email: string): Promise<User | undefined> {
    const user = database.users.find((user: any) => user.user_email === email);

    if (!user) {
      return undefined;
    }

    return UserAdapter.fromJson(user);
  }
}
