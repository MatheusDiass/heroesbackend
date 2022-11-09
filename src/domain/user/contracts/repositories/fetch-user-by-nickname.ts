import { User } from '../../entities/user';

export interface IFetchUserByNicknameRepository {
  fetchUserByNickname(nickname: string): Promise<User | undefined>;
}
