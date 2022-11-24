import { describe, it, expect } from 'vitest';
import { FetchUserByNicknameRepositoryInMemory } from './fetch-user-by-nickname-repository-in-memory';

describe('Fetch User By Nickname Repository In Memory', () => {
  it('should return user by nickname', async () => {
    const nickname = 'Test01';
    const sut = new FetchUserByNicknameRepositoryInMemory();
    const user = await sut.fetchUserByNickname(nickname);

    expect(user?.getNickname).toEqual(nickname);
  });

  it('should return undefined if nickname does not exist', async () => {
    const sut = new FetchUserByNicknameRepositoryInMemory();
    const user = await sut.fetchUserByNickname('Test0102');

    expect(user).toBeUndefined();
  });
});
