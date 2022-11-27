import { describe, expect, it } from 'vitest';
import { AddFavoriteUseCase } from './add-favorite';
import { Hero } from '../../../hero';
import { User } from '../../../user';
import { MissingParameterError, UserNotFoundError } from '../../../../errors';
import { HeroNotFoundError } from '../../../hero/errors';

type AddFavoriteInput = {
  userId: number;
  heroId: number;
};

class FetchUserByIdRepositorySpy {
  private users = [
    {
      id: 2,
      name: 'Test',
      lastname: 'Test',
      nickname: 'MrTest',
      email: 'test@test.com',
      password: 'Test@@test1',
      bio: 'Test bio',
      confirmationCode: 0,
    },
    {
      id: 3,
      name: 'Test',
      lastname: 'Test',
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

class FetchHeroByIdRepositorySpy {
  async fetchHeroById(id: number): Promise<Hero | undefined> {
    if (id === 1) {
      return undefined;
    }

    return new Hero({
      id,
      name: 'Iron Man',
      description: 'He is a superhero',
      image: 'ironman.jpeg',
      stories: [],
      events: [],
    });
  }
}

interface IAddFavoriteRepository {
  addFavorite({ userId, heroId }: AddFavoriteInput): Promise<void>;
}

class AddFavoriteRepositorySpy implements IAddFavoriteRepository {
  private userId = 0;
  private heroId = 0;

  async addFavorite({ userId, heroId }: AddFavoriteInput): Promise<void> {
    this.userId = userId;
    this.heroId = heroId;
  }
}

const makeSut = () => {
  const fetchUserByIdRepository = new FetchUserByIdRepositorySpy();
  const fetchHeroByIdRepository = new FetchHeroByIdRepositorySpy();
  const addFavoriteRepositorySpy = new AddFavoriteRepositorySpy();
  const sut = new AddFavoriteUseCase(
    fetchUserByIdRepository,
    fetchHeroByIdRepository,
    addFavoriteRepositorySpy
  );

  return sut;
};

const makeFetchUserByIdRepositoryWithError = () => {
  class FetchUserByIdRepositorySpy {
    async fetchUserById(): Promise<User | undefined> {
      throw new Error();
    }
  }

  return new FetchUserByIdRepositorySpy();
};

const makeFetchHeroByIdRepositoryWithError = () => {
  class FetchHeroByIdRepositorySpy {
    async fetchHeroById(): Promise<Hero | undefined> {
      throw new Error();
    }
  }

  return new FetchHeroByIdRepositorySpy();
};

const makeAddFavoriteRepositoryWithError = () => {
  class AddFavoriteRepositorySpy {
    async addFavorite(): Promise<void> {
      throw new Error();
    }
  }

  return new AddFavoriteRepositorySpy();
};

describe('Add Hero to Favorites Use Case', () => {
  it('should throw MissingParameterError type error if no user id is provided', () => {
    const sut = makeSut();

    expect(sut.execute({ userId: 0, heroId: 1234 })).rejects.toThrow(
      MissingParameterError
    );
  });

  it('should throw UserNotFoundError type error if the user is not found', () => {
    const sut = makeSut();

    expect(sut.execute({ userId: 1, heroId: 2 })).rejects.toThrow(
      UserNotFoundError
    );
  });

  it('should throw MissingParameterError type error if no hero id is provided', () => {
    const sut = makeSut();

    expect(sut.execute({ userId: 3, heroId: 0 })).rejects.toThrow(
      MissingParameterError
    );
  });

  it('should throw HeroNotFoundError type error if the hero is not found', () => {
    const sut = makeSut();

    expect(sut.execute({ userId: 2, heroId: 1 })).rejects.toThrow(
      HeroNotFoundError
    );
  });

  it('should throw error if any dependency throws', () => {
    const sut = new AddFavoriteUseCase(
      makeFetchUserByIdRepositoryWithError(),
      makeFetchHeroByIdRepositoryWithError(),
      makeAddFavoriteRepositoryWithError()
    );

    expect(sut.execute({ userId: 3, heroId: 1234 })).rejects.toThrow();
  });
});
