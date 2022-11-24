import { IRegisterUserRepository, User } from '../../../../../../domain/user';
import { UserAdapter } from '../../../../adapters';
import { database } from '../../../../../database-in-memory';

export class RegisterUserRepositoryInMemory implements IRegisterUserRepository {
  async registerUser(user: User): Promise<void> {
    database.users.push(UserAdapter.toJson(user));
  }
}
