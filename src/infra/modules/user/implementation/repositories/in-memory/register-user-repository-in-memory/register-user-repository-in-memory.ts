import {
  IRegisterUserRepository,
  User,
} from '../../../../../../../domain/modules/user';
import { UserAdapter } from '../../../../adapters';
import { database } from '../../../../../../database-in-memory';

export class RegisterUserRepositoryInMemory implements IRegisterUserRepository {
  async registerUser(user: User): Promise<User> {
    const userWithId = {
      ...UserAdapter.toJson(user),
      user_id: Math.floor(Math.random() * (999999 - 1 + 1)) + 1,
    };

    database.users.push(userWithId);

    return UserAdapter.fromJson(userWithId);
  }
}
