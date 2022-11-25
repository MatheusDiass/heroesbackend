import { describe, it, expect } from 'vitest';
import { FetchUserByEmailRepositoryInMemory } from './fetch-user-by-email-repository-in-memory';

describe('Fetch User By Email Repository In-Memory', () => {
  it('should return user by email', async () => {
    const email = 'test@test.com';
    const sut = new FetchUserByEmailRepositoryInMemory();
    const user = await sut.fetchUserByEmail(email);

    expect(user?.getEmail).toEqual(email);
  });

  it('should return undefined if email does not exist', async () => {
    const sut = new FetchUserByEmailRepositoryInMemory();
    const user = await sut.fetchUserByEmail('test@test.com.br');

    expect(user).toBeUndefined();
  });
});
