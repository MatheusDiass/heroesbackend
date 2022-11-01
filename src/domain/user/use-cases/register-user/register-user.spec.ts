import { describe, expect, it } from 'vitest';

import { User } from '../../';

class RegisterUserUseCase {
  constructor(
    private encrypter: EncrypterSpy,
    private registerUserRepository: IRegisterUserRepository,
    private mailProvider: MailProviderSpy
  ) {}

  async execute(user: User): Promise<User> {
    const hashPassword = this.encrypter.createHash(user.getPassword);
    user.setPassword = hashPassword;
    await this.registerUserRepository.registerUser(user);
    await this.mailProvider.sendEmail('Test');

    return user;
  }
}

interface IRegisterUserRepository {
  registerUser(user: User): Promise<User>;
}
class RegisterUserRepositorySpy implements IRegisterUserRepository {
  async registerUser(user: User): Promise<User> {
    return user;
  }
}

class EncrypterSpy {
  createHash(text: string): string {
    return `${text}hash`;
  }
}

class MailProviderSpy {
  public emailSent = false;
  public message = '';

  async sendEmail(message: string): Promise<void> {
    this.message = message;
    this.emailSent = true;
  }
}

const makeUserRegistrationData = (): User => {
  return new User({
    name: 'Test',
    lastName: 'Test',
    nickname: 'MrTest',
    email: 'test@test.com',
    password: 'test@@test',
  });
};

const makeSut = function () {
  const encrypter = new EncrypterSpy();
  const registerUserRepositorySpy = new RegisterUserRepositorySpy();
  const mailProviderSpy = new MailProviderSpy();
  const sut = new RegisterUserUseCase(
    encrypter,
    registerUserRepositorySpy,
    mailProviderSpy
  );

  return {
    sut,
    mailProviderSpy,
  };
};

const makeEncrypterError = () => {
  class EncrypterSpy {
    createHash(): string {
      throw new Error();
    }
  }

  return new EncrypterSpy();
};

const makeRegisterUserRepositoryError = () => {
  class RegisterUserRepository {
    registerUser(): Promise<User> {
      throw new Error();
    }
  }

  return new RegisterUserRepository();
};

const makeMailProviderError = () => {
  class MailProvider {
    public emailSent = false;
    public message = '';

    async sendEmail(message: string): Promise<void> {
      this.message = message;
      this.emailSent = false;
      throw new Error();
    }
  }

  return new MailProvider();
};

describe('Register User Use Case', () => {
  it('should return the same user information after registration', async () => {
    const userRegistrationData = makeUserRegistrationData();
    const { sut } = makeSut();
    const user = await sut.execute(userRegistrationData);

    expect(user).toEqual(userRegistrationData);
  });

  it('should sent a registration confirmation email', async () => {
    const userRegistrationData = makeUserRegistrationData();
    const { sut, mailProviderSpy } = makeSut();

    await sut.execute(userRegistrationData);

    expect(mailProviderSpy.emailSent).toBe(true);
  });

  it('should throw error if any dependency throws', () => {
    const userRegistrationData = makeUserRegistrationData();
    const sut = new RegisterUserUseCase(
      makeEncrypterError(),
      makeRegisterUserRepositoryError(),
      makeMailProviderError()
    );

    expect(sut.execute(userRegistrationData)).rejects.toThrow();
  });
});
