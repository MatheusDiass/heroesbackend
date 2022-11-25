import { describe, expect, it } from 'vitest';
import { User } from '../../../../../../../domain/modules/user';
import { RegisterUserRepositoryInMemory } from './register-user-repository-in-memory';
import { FetchUserByEmailRepositoryInMemory } from '../fetch-user-by-email-repository-in-memory/fetch-user-by-email-repository-in-memory';

describe('Register User Repository In-Memory', () => {
  it('', async () => {
    const email = 'test10@test.com';
    const sut = new RegisterUserRepositoryInMemory();
    await sut.registerUser(
      new User({
        name: 'Test',
        lastName: 'Test',
        nickname: 'Test10',
        email,
        password: 'Test@Test10',
        confirmationCode: 101010,
        bio: '',
      })
    );

    const fetchUserByEmailRepository = new FetchUserByEmailRepositoryInMemory();
    const user = await fetchUserByEmailRepository.fetchUserByEmail(email);

    expect(user?.getEmail).toEqual(email);
  });
});
