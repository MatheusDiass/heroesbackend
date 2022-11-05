import { User } from '../..';

export interface IRegisterUserRepository {
  registerUser(user: User): Promise<void>;
}
