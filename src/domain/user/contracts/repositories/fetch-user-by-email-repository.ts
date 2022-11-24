import { User } from '../..';

export interface IFetchUserByEmailRepository {
  fetchUserByEmail(email: string): Promise<User | undefined>;
}
