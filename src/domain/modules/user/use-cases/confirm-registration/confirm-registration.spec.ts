import { describe, expect, it } from 'vitest';
import {
  IncorrectConfirmationCodeError,
  MissingParameterError,
  RegistrationAlreadyConfirmedError,
  UserNotFoundError,
} from '../../../../errors';
import { User } from '../../entities/user';
import { ConfirmRegistrationUseCase } from './confirm-registration-use-case';

interface IFetchUserByIdRepository {
  fetchUserById(id: number): Promise<User | undefined>;
}

class FetchUserByIdRepositorySpy implements IFetchUserByIdRepository {
  private users = [
    {
      id: 2,
      name: 'Test',
      lastname: 'Test',
      nickname: 'MrTest',
      email: 'test@test.com',
      password: 'Test@@test1',
      bio: 'Test bio',
      confirmationCode: 0,
    },
    {
      id: 3,
      name: 'Test',
      lastname: 'Test',
      nickname: 'MrTest',
      email: 'test@test.com',
      password: 'Test@@test1',
      bio: 'Test bio',
      confirmationCode: 875611,
    },
  ];

  async fetchUserById(id: number): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      return new User(user);
    }

    return undefined;
  }
}

interface IConfirmRegistrationRepository {
  confirmRegistration(userId: number): Promise<void>;
}

class ConfirmRegistrationRepositorySpy
  implements IConfirmRegistrationRepository
{
  private userId = 0;

  async confirmRegistration(userId: number): Promise<void> {
    this.userId = userId;
  }
}

const makeSut = () => {
  const fetchUserByIdRepository = new FetchUserByIdRepositorySpy();
  const confirmRegistrationRepository = new ConfirmRegistrationRepositorySpy();
  const sut = new ConfirmRegistrationUseCase(
    fetchUserByIdRepository,
    confirmRegistrationRepository
  );

  return sut;
};

const makeFetchUserByIdRepositoryWithError = () => {
  class FetchUserByIdRepositorySpy {
    fetchUserById(): Promise<User | undefined> {
      throw new Error();
    }
  }

  return new FetchUserByIdRepositorySpy();
};

const makeConfirmRegistrationRepositoryWithError = () => {
  class ConfirmRegistrationRepositorySpy {
    confirmRegistration(): Promise<void> {
      throw new Error();
    }
  }

  return new ConfirmRegistrationRepositorySpy();
};

describe('Confirm Registration Use Case', () => {
  it('should throw MissingParameterError type error if no user id is provided', () => {
    const sut = makeSut();

    expect(
      sut.execute({ userId: 0, confirmationCode: 0 })
    ).rejects.toBeInstanceOf(MissingParameterError);
  });

  it('should throw MissingParameterError type error if no confirmation code is provided', () => {
    const sut = makeSut();

    expect(
      sut.execute({ userId: 3, confirmationCode: 0 })
    ).rejects.toBeInstanceOf(MissingParameterError);
  });

  it('should throw UserNotFoundError type error if the user does not exist', () => {
    const sut = makeSut();

    expect(
      sut.execute({ userId: 1, confirmationCode: 875611 })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it('should throw RegistrationAlreadyConfirmedError type error if the user has already confirmed the registration', () => {
    const sut = makeSut();

    expect(
      sut.execute({ userId: 2, confirmationCode: 875612 })
    ).rejects.toBeInstanceOf(RegistrationAlreadyConfirmedError);
  });

  it('should throw IncorrectConfirmationCodeError type error if the user confirmation code is different from the sent confirmation code', () => {
    const sut = makeSut();

    expect(
      sut.execute({ userId: 3, confirmationCode: 875612 })
    ).rejects.toBeInstanceOf(IncorrectConfirmationCodeError);
  });

  it('should throw error if any dependency throws', () => {
    const sut = new ConfirmRegistrationUseCase(
      makeFetchUserByIdRepositoryWithError(),
      makeConfirmRegistrationRepositoryWithError()
    );

    expect(
      sut.execute({ userId: 3, confirmationCode: 875611 })
    ).rejects.toThrow();
  });
});
