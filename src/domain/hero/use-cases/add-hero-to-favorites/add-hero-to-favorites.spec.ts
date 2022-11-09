import { describe, expect, it } from 'vitest';

type AddHeroToFavorites = {
  userId: number;
  heroId: number;
};

class AddHeroToFavoritesUseCase {
  constructor(
    private readonly addHeroToFavoritesRepository: IAddHeroToFavoritesRepository
  ) {}

  async execute({ userId, heroId }: AddHeroToFavorites): Promise<void> {
    if (!userId) {
      throw new Error();
    }

    if (!heroId) {
      throw new Error();
    }

    await this.addHeroToFavoritesRepository.addHeroToFavorites({
      userId,
      heroId,
    });
  }
}

interface IAddHeroToFavoritesRepository {
  addHeroToFavorites({ userId, heroId }: AddHeroToFavorites): Promise<void>;
}

class AddHeroToFavoritesRepositorySpy implements IAddHeroToFavoritesRepository {
  private userId = 0;
  private heroId = 0;

  async addHeroToFavorites({
    userId,
    heroId,
  }: AddHeroToFavorites): Promise<void> {
    this.userId = userId;
    this.heroId = heroId;
  }
}

const makeSut = () => {
  const addHeroToFavoritesRepositorySpy = new AddHeroToFavoritesRepositorySpy();
  const sut = new AddHeroToFavoritesUseCase(addHeroToFavoritesRepositorySpy);

  return sut;
};

const makeAddHeroToFavoritesRepositoryWithError = () => {
  class AddHeroToFavoritesRepositorySpy {
    async addHeroToFavorites(): Promise<void> {
      throw new Error();
    }
  }

  return new AddHeroToFavoritesRepositorySpy();
};

describe('Add Hero to Favorites Use Case', () => {
  it('should throw an error if no user id is provided', () => {
    const sut = makeSut();

    expect(sut.execute({ userId: 0, heroId: 1234 })).rejects.toThrow();
  });

  it('should throw an error if no hero id is provided', () => {
    const sut = makeSut();

    expect(sut.execute({ userId: 3, heroId: 0 })).rejects.toThrow();
  });

  it('should throw error if any dependency throws', () => {
    const sut = new AddHeroToFavoritesUseCase(
      makeAddHeroToFavoritesRepositoryWithError()
    );

    expect(sut.execute({ userId: 3, heroId: 1234 })).rejects.toThrow();
  });
});
