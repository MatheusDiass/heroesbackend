import { describe, it, expect } from 'vitest';
import { FetchUserByIdRepositoryInMemory } from './fetch-user-by-id-repository-in-memory';

describe('Fetch User By Id Repository In-Memory', () => {
  it('should return user by id', async () => {
    const sut = new FetchUserByIdRepositoryInMemory();
    const user = await sut.fetchUserById(1);

    expect(user?.getId).toEqual(1);
  });

  it('should return undefined if id does not exist', async () => {
    const sut = new FetchUserByIdRepositoryInMemory();
    const user = await sut.fetchUserById(0);

    expect(user).toBeUndefined();
  });
});
