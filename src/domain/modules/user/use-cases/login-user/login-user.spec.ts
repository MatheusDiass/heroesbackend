import { describe, expect, it /*, test*/ } from 'vitest';
import { User } from '../../';
import { LoginUserUseCase } from './login-user-use-case';
import {
  EmptyParameterError,
  IncorrectEmailFormatError,
  IncorrectPasswordError,
  IncorrectPasswordFormatError,
  UnconfirmedRegistrationError,
  //MissingParameterError,
  UserNotFoundError,
} from '../../../../errors';

interface IFetchUserByEmailRepository {
  fetchUserByEmail(email: string): Promise<User | undefined>;
}

class FetchUserByEmailRepository implements IFetchUserByEmailRepository {
  private users: any[] = [
    {
      id: 1,
      name: 'Test2',
      lastname: 'Test',
      nickname: '',
      email: 'test1@test.com',
      password: 'Test1@@test1hash',
      confirmationCode: 0,
      bio: '',
    },
    {
      id: 2,
      name: 'Test2',
      lastname: 'Test',
      nickname: '',
      email: 'test2@test.com',
      password: 'Test2@@test2hash',
      confirmationCode: 101010,
      bio: '',
    },
  ];

  async fetchUserByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return undefined;
    }

    return new User({
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      nickname: user.nickname,
      email: user.email,
      password: user.password,
      confirmationCode: user.confirmationCode,
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

class TokenSpy {
  create(): string {
    return 'token';
  }

  verify(): any {
    return true;
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
  const fetchUserByEmailRepository = new FetchUserByEmailRepository();
  const token = new TokenSpy();
  const sut = new LoginUserUseCase(
    mailValidator,
    passwordValidator,
    encrypter,
    fetchUserByEmailRepository,
    token
  );

  return {
    sut,
    encrypter,
  };
};

const makeFindUserByEmailRepositoryError = () => {
  class FetchUserByEmailRepository implements IFetchUserByEmailRepository {
    private email = '';

    fetchUserByEmail(email: string): Promise<User | undefined> {
      this.email = email;
      throw new Error();
    }
  }

  return new FetchUserByEmailRepository();
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

const makeTokenError = () => {
  class TokenSpy {
    create(): string {
      throw new Error();
    }

    verify(): any {
      throw new Error();
    }
  }

  return new TokenSpy();
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

  it('should throw EmptyParameterError type error if the email is empty', () => {
    const loginData = makeLoginData();
    loginData.email = '';

    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toBeInstanceOf(EmptyParameterError);
  });

  it('should throw IncorrectEmailFormatError type error if the email is incorrect format', async () => {
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

  it('should throw EmptyParameterError type error if the password is empty', () => {
    const loginData = makeLoginData();
    loginData.password = '';

    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toBeInstanceOf(EmptyParameterError);
  });

  it('should throw IncorrectPasswordFormatError type error if the password is incorrect format', async () => {
    const loginData = makeLoginData();
    loginData.password = 'a';
    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toBeInstanceOf(
      IncorrectPasswordFormatError
    );
  });

  it('should throw UserNotFoundError type error if the user does not exist', () => {
    const loginData = makeLoginData();
    loginData.email = 'test@test.com';

    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it('should throw UnconfirmedRegistrationError type error if the user has not confirmed the registration', () => {
    const { sut } = makeSut();

    expect(
      sut.execute({ email: 'test2@test.com', password: 'Test2@@test2' })
    ).rejects.toBeInstanceOf(UnconfirmedRegistrationError);
  });

  it('should throw IncorrectPasswordError type error if the user has not confirmed the registration', () => {
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
      makeFindUserByEmailRepositoryError(),
      makeTokenError()
    );

    expect(sut.execute(loginData)).rejects.toThrow();
  });
});
