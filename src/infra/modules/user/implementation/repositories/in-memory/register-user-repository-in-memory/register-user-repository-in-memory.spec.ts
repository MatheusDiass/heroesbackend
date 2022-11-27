import { describe, expect, it } from 'vitest';
import { User } from '../../../../../../../domain/modules/user';
import { RegisterUserRepositoryInMemory } from './register-user-repository-in-memory';

describe('Register User Repository In-Memory', () => {
  it('should save the user', async () => {
    const email = 'test10@test.com';
    const sut = new RegisterUserRepositoryInMemory();
    const user = await sut.registerUser(
      new User({
        name: 'Test',
        lastname: 'Test',
        nickname: 'Test10',
        email,
        password: 'Test@Test10',
        confirmationCode: 101010,
        bio: '',
      })
    );

    expect(user?.getEmail).toEqual(email);
  });
});
