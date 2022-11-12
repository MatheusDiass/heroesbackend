import { describe, expect, it } from 'vitest';

import { User } from '../../';

class RegisterUserUseCase {
  constructor(
    private readonly mailValidator: MailValidator,
    private readonly passwordValidator: PasswordValidator,
    private readonly encrypter: EncrypterSpy,
    private readonly fetchUserByNicknameRepository: IFetchUserByNicknameRepository,
    private readonly registerUserRepository: IRegisterUserRepository,
    private readonly mailProvider: MailProviderSpy
  ) {}

  async execute(user: User): Promise<User> {
    let nicknameExists: User | undefined;

    const isMailValid = this.mailValidator.validateMail(user.getEmail);

    if (!isMailValid) {
      throw new Error();
    }

    const isPasswordValid = this.passwordValidator.validatePassword(
      user.getPassword
    );

    if (!isPasswordValid) {
      throw new Error();
    }

    if (user.getNickname) {
      nicknameExists =
        await this.fetchUserByNicknameRepository.fetchUserByNickname(
          user.getNickname
        );

      if (nicknameExists) {
        throw new Error();
      }
    }

    const hashPassword = await this.encrypter.createHash(user.getPassword);
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

interface IFetchUserByNicknameRepository {
  fetchUserByNickname(nickname: string): Promise<User | undefined>;
}

class FetchUserByNicknameRepositorySpy
  implements IFetchUserByNicknameRepository
{
  async fetchUserByNickname(nickname: string): Promise<User | undefined> {
    if (nickname === 'MrTest01') {
      return new User({
        name: 'Test',
        lastName: 'Test',
        nickname: 'MrTest01',
        email: 'test@test.com',
        password: 'Test@@test1',
      });
    }

    return undefined;
  }
}

class EncrypterSpy {
  async createHash(text: string): Promise<string> {
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

class PasswordValidator {
  validatePassword(password: string): boolean {
    const regexp =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (password.match(regexp)) {
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
    password: 'Test@@test1',
  });
};

const makeSut = function () {
  const emailValidator = new MailValidator();
  const passwordValidator = new PasswordValidator();
  const encrypter = new EncrypterSpy();
  const fetchUserByNicknameRepositorySpy =
    new FetchUserByNicknameRepositorySpy();
  const registerUserRepositorySpy = new RegisterUserRepositorySpy();
  const mailProviderSpy = new MailProviderSpy();
  const sut = new RegisterUserUseCase(
    emailValidator,
    passwordValidator,
    encrypter,
    fetchUserByNicknameRepositorySpy,
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
    async createHash(): Promise<string> {
      throw new Error();
    }
  }

  return new EncrypterSpy();
};

const makePasswordValidatorError = () => {
  class PasswordValidator {
    validatePassword(): boolean {
      throw new Error();
    }
  }

  return new PasswordValidator();
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

const makeFetchUserByNicknameRepositoryError = () => {
  class FetchUserByNicknameRepositorySpy {
    async fetchUserByNickname(): Promise<User> {
      throw new Error();
    }
  }

  return new FetchUserByNicknameRepositorySpy();
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

  it('should throw error if password is incorrect format', async () => {
    const userRegistrationData = makeUserRegistrationData(
      new User({
        name: 'Test',
        lastName: 'Test',
        nickname: 'MrTest',
        email: 'test@test.com',
        password: 'a',
      })
    );
    const { sut } = makeSut();

    expect(sut.execute(userRegistrationData)).rejects.toThrow();
  });

  it('should throw an error if the nickname already exists', () => {
    const userRegistrationData = makeUserRegistrationData(
      new User({
        name: 'Test',
        lastName: 'Test',
        nickname: 'MrTest01',
        email: 'test@test.com',
        password: 'Test@@test1',
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
      makePasswordValidatorError(),
      makeEncrypterError(),
      makeFetchUserByNicknameRepositoryError(),
      makeRegisterUserRepositoryError(),
      makeMailProviderError()
    );

    expect(sut.execute(userRegistrationData)).rejects.toThrow();
  });
});
