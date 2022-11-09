import { describe, expect, it } from 'vitest';
import { User } from '../../entities/user';

type UserRegistrationConfirmation = {
  userId: number;
  confirmationCode: number;
};

class ConfirmRegistrationUseCase {
  constructor(
    private readonly fetchUserByIdRepository: IFetchUserByIdRepository,
    private readonly confirmRegistrationRepository: IConfirmRegistrationRepository
  ) {}

  async execute({
    userId,
    confirmationCode,
  }: UserRegistrationConfirmation): Promise<void> {
    if (!userId) {
      throw new Error();
    }

    if (!confirmationCode) {
      throw new Error();
    }

    const user = await this.fetchUserByIdRepository.fetchUserById(userId);

    if (!user) {
      throw new Error();
    }

    if (!user.getConfirmationCode) {
      throw new Error();
    }

    if (confirmationCode !== user.getConfirmationCode) {
      throw new Error();
    }

    await this.confirmRegistrationRepository.confirmRegistration(userId);
  }
}

interface IFetchUserByIdRepository {
  fetchUserById(id: number): Promise<User | undefined>;
}

class FetchUserByIdRepositorySpy implements IFetchUserByIdRepository {
  private users = [
    {
      id: 2,
      name: 'Test',
      lastName: 'Test',
      nickname: 'MrTest',
      email: 'test@test.com',
      password: 'Test@@test1',
      bio: 'Test bio',
      confirmationCode: 0,
    },
    {
      id: 3,
      name: 'Test',
      lastName: 'Test',
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
  it('should throw an error if no user id is provided', () => {
    const sut = makeSut();

    expect(sut.execute({ userId: 0, confirmationCode: 0 })).rejects.toThrow();
  });

  it('should throw an error if no confirmation code is provided', () => {
    const sut = makeSut();

    expect(sut.execute({ userId: 3, confirmationCode: 0 })).rejects.toThrow();
  });

  it('should throw an error if the user does not exist', () => {
    const sut = makeSut();

    expect(
      sut.execute({ userId: 1, confirmationCode: 875611 })
    ).rejects.toThrow();
  });

  it('should throw an error if the user has already confirmed the registration', () => {
    const sut = makeSut();

    expect(
      sut.execute({ userId: 2, confirmationCode: 875612 })
    ).rejects.toThrow();
  });

  it('should throw an error if the user confirmation code is different from the sent confirmation code', () => {
    const sut = makeSut();

    expect(
      sut.execute({ userId: 3, confirmationCode: 875612 })
    ).rejects.toThrow();
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
