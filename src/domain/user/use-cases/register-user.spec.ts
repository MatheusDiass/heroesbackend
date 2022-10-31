import { describe, expect, it } from 'vitest';

import { User } from '../';

class RegisterUserUseCase {
  constructor(
    private encrypter: EncrypterSpy,
    private registerUserRepository: RegisterUserRepositorySpy,
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

// interface IRegisterUserRepository {
//   registerUser(user: User): Promise<User>;
// }

class RegisterUserRepositorySpy {
  async registerUser(user: User): Promise<User> {
    return user;
  }
}

// interface IEncrypter {
//   createHash(text: string): string;
// }

class EncrypterSpy {
  createHash(text: string): string {
    return `${text}hash`;
  }
}

// interface IMailProviderSpy {
//   sendEmail(message: string): Promise<void>;
// }

class MailProviderSpy {
  public emailSent = false;
  public message = '';

  async sendEmail(message: string): Promise<void> {
    this.message = message;
    this.emailSent = true;
  }
}

const makeUser = function () {
  return new User({
    name: 'Matheus',
    lastName: 'Dias',
    nickname: 'MrDias',
    email: 'dias.math0@gmail.com',
    password: 'matheus@@dias',
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
  it('should have encrypted password in user entity instance after calling', async () => {
    const password = 'matheus@@dias';

    const user = new User({
      name: 'Matheus',
      lastName: 'Dias',
      nickname: 'MrDias',
      email: 'dias.math0@gmail.com',
      password,
    });

    const encrypter = new EncrypterSpy();
    const { sut } = makeSut();
    const userInfo = await sut.execute(user);
    const passwordHash = encrypter.createHash(password);

    expect(userInfo.getPassword).toEqual(passwordHash);
  });

  it('should return the same user information after registration', async () => {
    const user = new User({
      name: 'Matheus',
      lastName: 'Dias',
      nickname: 'MrDias',
      email: 'dias.math0@gmail.com',
      password: 'matheus@@dias',
    });

    const { sut } = makeSut();
    const userInfo = await sut.execute(user);

    expect(userInfo).toEqual(user);
  });

  it('should sent a registration confirmation email', async () => {
    const user = makeUser();
    const { sut, mailProviderSpy } = makeSut();

    await sut.execute(user);

    expect(mailProviderSpy.emailSent).toBe(true);
  });

  it('should throw if any dependency throws', () => {
    const user = makeUser();
    const sut = new RegisterUserUseCase(
      makeEncrypterError(),
      makeRegisterUserRepositoryError(),
      makeMailProviderError()
    );

    expect(sut.execute(user)).rejects.toThrow();
  });
});
