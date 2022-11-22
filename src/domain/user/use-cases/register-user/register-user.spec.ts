import { describe, expect, it } from 'vitest';

import { User } from '../../';
import {
  IncorrectEmailFormatError,
  IncorrectPasswordFormatError,
  NicknameAlreadyExistsError,
} from '../../../errors';
import { RegisterUserUseCase } from './register-user-use-case';
import { Message } from '../../../../utils';

interface IRegisterUserRepository {
  registerUser(user: User): Promise<void>;
}

class RegisterUserRepositorySpy implements IRegisterUserRepository {
  private user = {};

  async registerUser(user: User): Promise<void> {
    this.user = user;
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

class EncrypterSpy {
  async createHash(text: string): Promise<string> {
    return `${text}hash`;
  }

  async compareHash(text: string, hash: string): Promise<boolean> {
    return `${text}hash` === hash;
  }
}

class MailProviderSpy {
  public emailSent = false;
  public message = {};

  async sendMail(message: Message): Promise<string> {
    this.message = message;
    this.emailSent = true;
    return '';
  }
}

class CodeGenerator {
  generateCode(): number {
    return 111111;
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
  const codeGenerator = new CodeGenerator();
  const sut = new RegisterUserUseCase(
    emailValidator,
    passwordValidator,
    encrypter,
    fetchUserByNicknameRepositorySpy,
    registerUserRepositorySpy,
    mailProviderSpy,
    codeGenerator
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

const makePasswordValidatorError = () => {
  class PasswordValidator {
    validatePassword(): boolean {
      throw new Error();
    }
  }

  return new PasswordValidator();
};

const makeEncrypterError = () => {
  class EncrypterSpy {
    async createHash(): Promise<string> {
      throw new Error();
    }

    async compareHash(): Promise<boolean> {
      throw new Error();
    }
  }

  return new EncrypterSpy();
};

const makeFetchUserByNicknameRepositoryError = () => {
  class FetchUserByNicknameRepositorySpy {
    async fetchUserByNickname(): Promise<User> {
      throw new Error();
    }
  }

  return new FetchUserByNicknameRepositorySpy();
};

const makeRegisterUserRepositoryError = () => {
  class RegisterUserRepository {
    registerUser(): Promise<void> {
      throw new Error();
    }
  }

  return new RegisterUserRepository();
};

const makeMailProviderError = () => {
  class MailProvider {
    public emailSent = false;
    public message = {};

    async sendMail(message: Message): Promise<string> {
      this.message = message;
      this.emailSent = false;
      throw new Error();
    }
  }

  return new MailProvider();
};

const makeCodeGeneratorError = () => {
  class CodeGenerator {
    generateCode(): number {
      throw new Error();
    }
  }

  return new CodeGenerator();
};

describe('Register User Use Case', () => {
  it('should throw IncorrectEmailFormatError type error if the email is in incorrect format', async () => {
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

    expect(sut.execute(userRegistrationData)).rejects.toBeInstanceOf(
      IncorrectEmailFormatError
    );
  });

  it('should throw IncorrectPasswordFormatError type error if the password is in incorrect format', async () => {
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

    expect(sut.execute(userRegistrationData)).rejects.toBeInstanceOf(
      IncorrectPasswordFormatError
    );
  });

  it('should throw NicknameAlreadyExistsError type error if the nickname already exists', () => {
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

    expect(sut.execute(userRegistrationData)).rejects.toBeInstanceOf(
      NicknameAlreadyExistsError
    );
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
      makeMailProviderError(),
      makeCodeGeneratorError()
    );

    expect(sut.execute(userRegistrationData)).rejects.toThrow();
  });
});
