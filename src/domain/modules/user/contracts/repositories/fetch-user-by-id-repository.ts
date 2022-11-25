import { User } from '../../';

export interface IFetchUserByIdRepository {
  fetchUserById(id: number): Promise<User | undefined>;
}
