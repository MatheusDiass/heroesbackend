import { describe, expect, it } from 'vitest';
import { User } from '../../';

type LoginUser = {
  email: string;
  password: string;
};

class LoginUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository
  ) {}

  async execute({ email, password }: LoginUser): Promise<User> {
    if (email.trim() === '') {
      throw new Error();
    }

    if (password.trim() === '') {
      throw new Error();
    }

    const user = await this.findUserByEmailRepository.findUserByEmail(email);

    if (!user) {
      throw new Error();
    }

    if (user.getPassword !== password) {
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
      password: 'test1@@test1',
      bio: '',
    },
    {
      id: 2,
      name: 'Test2',
      lastName: 'Test',
      nickname: '',
      email: 'test2@test.com',
      password: 'test2@@test2',
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

describe('Login User Use Case', () => {
  it('should throw error if no email is provided', () => {
    const loginData = {
      email: '',
      password: 'test@@test',
    };

    const findUserByEmailRepository = new FindUserByEmailRepository();
    const sut = new LoginUserUseCase(findUserByEmailRepository);
    const promise = sut.execute(loginData);

    expect(promise).rejects.toThrow();
  });

  it('should throw error if no password is provided', () => {
    const loginData = {
      email: 'test@test.com',
      password: 'test@@test',
    };

    const findUserByEmailRepository = new FindUserByEmailRepository();
    const sut = new LoginUserUseCase(findUserByEmailRepository);
    const promise = sut.execute(loginData);

    expect(promise).rejects.toThrow();
  });

  it('should throw error if user does not exist', () => {
    const loginData = {
      email: 'test@test.com',
      password: 'test@@test',
    };

    const findUserByEmailRepository = new FindUserByEmailRepository();
    const sut = new LoginUserUseCase(findUserByEmailRepository);
    const promise = sut.execute(loginData);

    expect(promise).rejects.toThrow();
  });

  //Estou fazendo esse teste
  it('should throw error if user password is incorrect', () => {
    const loginData = {
      email: 'test2@test.com',
      password: 'test@@test2',
    };

    const findUserByEmailRepository = new FindUserByEmailRepository();
    const sut = new LoginUserUseCase(findUserByEmailRepository);
    const promise = sut.execute(loginData);

    expect(promise).rejects.toThrow();
  });

  it('should throw error if any dependency throws', () => {
    const loginData = {
      email: 'test@test.com',
      password: 'test@@test',
    };

    const sut = new LoginUserUseCase(makeFindUserByEmailRepositoryError());

    expect(sut.execute(loginData)).rejects.toThrow();
  });
});
