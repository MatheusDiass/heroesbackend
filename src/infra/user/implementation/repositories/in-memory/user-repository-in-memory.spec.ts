import { describe, expect, it } from 'vitest';
import { User } from '../../../../../domain/user';
import { UserRepositoryInMemory } from './user-repository-in-memory';

const makeUserRegistrationData = () => {
  return new User({
    id: 1,
    name: 'Test',
    lastName: 'Test',
    nickname: 'Test01',
    email: 'test@test.com',
    password: 'Test!!1010',
    confirmationCode: 1111,
  });
};

describe('User Repository In-Memory', () => {
  it('should return confirmation code 0 after confirming registration', async () => {
    const sut = new UserRepositoryInMemory();

    const userRegistrationData = makeUserRegistrationData();

    await sut.registerUser(userRegistrationData);
    await sut.confirmRegistration(1);
    const user = await sut.fetchUserById(1);

    expect(user?.getConfirmationCode).toEqual(0);
  });

  it('should return user by id', async () => {
    const sut = new UserRepositoryInMemory();

    const userRegistrationData = makeUserRegistrationData();

    await sut.registerUser(userRegistrationData);
    const user = await sut.fetchUserById(1);

    expect(userRegistrationData.getId).toEqual(user?.getId);
  });

  it('should return undefined if id does not exist', async () => {
    const sut = new UserRepositoryInMemory();

    const userRegistrationData = makeUserRegistrationData();

    await sut.registerUser(userRegistrationData);
    const user = await sut.fetchUserById(0);

    expect(user).toEqual(undefined);
  });

  it('should return user by email', async () => {
    const sut = new UserRepositoryInMemory();

    const userRegistrationData = makeUserRegistrationData();

    await sut.registerUser(userRegistrationData);
    const user = await sut.findUserByEmail('test@test.com');

    expect(userRegistrationData.getId).toEqual(user?.getId);
  });

  it('should return undefined if email does not exist', async () => {
    const sut = new UserRepositoryInMemory();

    const userRegistrationData = makeUserRegistrationData();

    await sut.registerUser(userRegistrationData);
    const user = await sut.findUserByEmail('test@test.com.br');

    expect(user).toEqual(undefined);
  });

  it('should return user by nickname', async () => {
    const sut = new UserRepositoryInMemory();

    const userRegistrationData = makeUserRegistrationData();

    await sut.registerUser(userRegistrationData);
    const user = await sut.fetchUserByNickname('Test01');

    expect(userRegistrationData.getId).toEqual(user?.getId);
  });

  it('should return undefined if nickname does not exist', async () => {
    const sut = new UserRepositoryInMemory();

    const userRegistrationData = makeUserRegistrationData();

    await sut.registerUser(userRegistrationData);
    const user = await sut.fetchUserByNickname('Test0102');

    expect(user).toEqual(undefined);
  });
});
