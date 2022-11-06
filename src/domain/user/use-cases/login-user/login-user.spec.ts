import { describe, expect, it, test } from 'vitest';
import { User } from '../../';

type LoginUser = {
  mail: string;
  password: string;
};

class LoginUserUseCase {
  constructor(
    private readonly mailValidator: MailValidator,
    private readonly passwordValidator: PasswordValidator,
    private readonly encrypter: EncrypterSpy,
    private readonly findUserByEmailRepository: IFindUserByEmailRepository
  ) {}

  async execute({ mail, password }: LoginUser): Promise<User> {
    if (mail.trim() === '') {
      throw new Error();
    }

    const isMailValid = this.mailValidator.validateMail(mail);

    if (!isMailValid) {
      throw new Error();
    }

    if (password.trim() === '') {
      throw new Error();
    }

    const isPasswordValid = this.passwordValidator.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error();
    }

    const user = await this.findUserByEmailRepository.findUserByEmail(mail);

    if (!user) {
      throw new Error();
    }

    const passwordHash = this.encrypter.createHash(password);

    if (user.getPassword !== passwordHash) {
      throw new Error();
    }

    return user;
  }
}

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
  public isEncrypted = false;

  createHash(text: string): string {
    this.isEncrypted = true;
    return `${text}hash`;
  }
}

const makeLoginData = () => {
  return {
    mail: 'test1@test.com',
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
    public isEncrypted = false;

    createHash(): string {
      this.isEncrypted = false;
      throw new Error();
    }
  }

  return new EncrypterSpy();
};

describe('Login User Use Case', () => {
  it('should throw error if no email is provided', () => {
    const loginData = makeLoginData();
    loginData.mail = '';

    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toThrow();
  });

  it('should throw error if email is incorrect format', async () => {
    const loginData = makeLoginData();
    loginData.mail = 'test1@.com';
    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toThrow();
  });

  it('should throw error if no password is provided', () => {
    const loginData = makeLoginData();
    loginData.password = '';

    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toThrow();
  });

  it('should throw error if password is incorrect format', async () => {
    const loginData = makeLoginData();
    loginData.password = 'a';
    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toThrow();
  });

  it('should throw error if user does not exist', () => {
    const loginData = makeLoginData();
    loginData.mail = 'test@test.com';

    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toThrow();
  });

  it('should throw error if user password is incorrect', () => {
    const loginData = makeLoginData();
    loginData.password = 'Test@@test2';

    const { sut } = makeSut();

    expect(sut.execute(loginData)).rejects.toThrow();
  });

  test('if password is encrypted', async () => {
    const loginData = makeLoginData();

    const { sut, encrypter } = makeSut();
    await sut.execute(loginData);

    expect(encrypter.isEncrypted).toEqual(true);
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
