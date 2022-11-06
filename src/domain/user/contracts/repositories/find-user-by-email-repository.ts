import { User } from '../../';

export interface IFindUserByEmailRepository {
  findUserByEmail(email: string): Promise<User | undefined>;
}
