import { describe, expect, it } from 'vitest';

import { User } from '../../';

class RegisterUserUseCase {
  constructor(
    private mailValidator: MailValidator,
    private encrypter: EncrypterSpy,
    private registerUserRepository: IRegisterUserRepository,
    private mailProvider: MailProviderSpy
  ) {}

  async execute(user: User): Promise<User> {
    const isMailValid = this.mailValidator.validateMail(user.getEmail);

    if (!isMailValid) {
      throw new Error();
    }

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

class MailValidator {
  validateMail(email: string): boolean {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.match(regexp)) {
      return true;
    }

    return false;
  }
}

const makeUserRegistrationData = (user?: User): User => {
  if (user) {
    return user;
  }

  return new User({
    name: 'Test',
    lastName: 'Test',
    nickname: 'MrTest',
    email: 'test@test.com',
    password: 'test@@test',
  });
};

const makeSut = function () {
  const emailValidator = new MailValidator();
  const encrypter = new EncrypterSpy();
  const registerUserRepositorySpy = new RegisterUserRepositorySpy();
  const mailProviderSpy = new MailProviderSpy();
  const sut = new RegisterUserUseCase(
    emailValidator,
    encrypter,
    registerUserRepositorySpy,
    mailProviderSpy
  );

  return {
    sut,
    mailProviderSpy,
  };
};

const makeMailValidatorError = () => {
  class MailValidator {
    validateMail(): boolean {
      throw new Error();
    }
  }

  return new MailValidator();
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
  it('should throw error if email is incorrect format', async () => {
    const userRegistrationData = makeUserRegistrationData(
      new User({
        name: 'Test',
        lastName: 'Test',
        nickname: 'MrTest',
        email: 'test@.com',
        password: 'test@@test',
      })
    );
    const { sut } = makeSut();

    expect(sut.execute(userRegistrationData)).rejects.toThrow();
  });

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
      makeMailValidatorError(),
      makeEncrypterError(),
      makeRegisterUserRepositoryError(),
      makeMailProviderError()
    );

    expect(sut.execute(userRegistrationData)).rejects.toThrow();
  });
});
