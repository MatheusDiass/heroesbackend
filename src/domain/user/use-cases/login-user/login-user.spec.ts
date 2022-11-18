import { describe, expect, it /*, test*/ } from 'vitest';
import { User } from '../../';
import { LoginUserUseCase } from './login-user-use-case';
import {
  EmptyParameterError,
  IncorrectEmailFormatError,
  IncorrectPasswordError,
  IncorrectPasswordFormatError,
  //MissingParameterError,
  UserNotFoundError,
} from '../../../errors';

interface IFindUserByEmailRepository {
  findUserByEmail(email: string): Promise<User | undefined>;
}

class FindUserByEmailRepository implements IFindUserByEmailRepository {
  private users: any[] = [
    {
      id: 1,
      name: 'Test2',
      lastName: 'Test',
      nickname: '',
      email: 'test1@test.com',
      password: 'Test1@@test1hash',
      bio: '',
    },
    {
      id: 2,
      name: 'Test2',
      lastName: 'Test',
      nickname: '',
      email: 'test2@test.com',
      password: 'test2@@test2hash',
      bio: '',
    },
  ];

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return undefined;
    }

    return new User({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      nickname: user.nickname,
      email: user.email,
      password: user.password,
      bio: user.bio,
    });
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

const makeLoginData = () => {
  return {
    email: 'test1@test.com',
    password: 'Test1@@test1',
  };
};

const makeSut = () => {
  const mailValidator = new MailValidator();
  const passwordValidator = new PasswordValidator();
  const encrypter = new EncrypterSpy();
  const findUserByEmailRepository = new FindUserByEmailRepository();
  const sut = new LoginUserUseCase(
    mailValidator,
    passwordValidator,
    encrypter,
    findUserByEmailRepository
  );

  return {
    sut,
    encrypter,
  };
};

const makeFindUserByEmailRepositoryError = () => {
  class FindUserByEmailRepository implements IFindUserByEmailRepository {
    private email = '';

    findUserByEmail(email: string): Promise<User | undefined> {
      this.email = email;
      throw new Error();
    }
  }

  return new FindUserByEmailRepository();
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

describe('Login User Use Case', () => {
  /* Test commented to not display errors in the code 
  because for this test it is necessary that the "LoginUser" type 
  has the optional properties, to use this test make the LoginUser
  properties optional */

  // it('should throw MissingParameterError type error if no email is provided', () => {
  //   const loginData = {
  //     password: 'Test1@@test1',
  //   };

  //   const { sut } = makeSut();

  //   expect(sut.execute(loginData)).rejects.toBeInstanceOf(
  //     MissingParameterError
  //   );
  // });

  it('should throw EmptyParameterError type error if email is empty', () => {
    const loginData = makeLoginData();
    loginData.email = '';

    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toBeInstanceOf(EmptyParameterError);
  });

  it('should throw IncorrectEmailFormatError type error if email is incorrect format', async () => {
    const loginData = makeLoginData();
    loginData.email = 'test1@.com';
    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toBeInstanceOf(
      IncorrectEmailFormatError
    );
  });

  /* Test commented to not display errors in the code 
  because for this test it is necessary that the "LoginUser" type 
  has the optional properties, to use this test make the LoginUser
  properties optional */

  // it('should throw MissingParameterError type error if no password is provided', () => {
  //   const loginData = {
  //     email: 'test1@test.com',
  //   };

  //   const { sut } = makeSut();

  //   expect(sut.execute(loginData)).rejects.toBeInstanceOf(
  //     MissingParameterError
  //   );
  // });

  it('should throw EmptyParameterError type error if password is empty', () => {
    const loginData = makeLoginData();
    loginData.password = '';

    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toBeInstanceOf(EmptyParameterError);
  });

  it('should throw IncorrectPasswordFormatError type error if password is incorrect format', async () => {
    const loginData = makeLoginData();
    loginData.password = 'a';
    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toBeInstanceOf(
      IncorrectPasswordFormatError
    );
  });

  it('should throw UserNotFoundError type error if user does not exist', () => {
    const loginData = makeLoginData();
    loginData.email = 'test@test.com';

    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it('should throw IncorrectPasswordError type error if user password is incorrect', () => {
    const loginData = makeLoginData();
    loginData.password = 'Test@@test2';

    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toBeInstanceOf(
      IncorrectPasswordError
    );
  });

  it('should throw error if any dependency throws', () => {
    const loginData = makeLoginData();

    const sut = new LoginUserUseCase(
      makeMailValidatorError(),
      makePasswordValidatorError(),
      makeEncrypterError(),
      makeFindUserByEmailRepositoryError()
    );

    expect(sut.execute(loginData)).rejects.toThrow();
  });
});
