import { describe, expect, it } from 'vitest';

type AddFavoriteInput = {
  userId: number;
  heroId: number;
  favoriteName: string;
};

class AddFavoriteUseCase {
  constructor(private readonly addFavoriteRepository: IAddFavoriteRepository) {}

  async execute({
    userId,
    heroId,
    favoriteName,
  }: AddFavoriteInput): Promise<void> {
    if (favoriteName.trim() === '') {
      throw new Error();
    }

    if (favoriteName.length < 4) {
      throw new Error();
    }

    if (favoriteName.length > 15) {
      throw new Error();
    }

    if (!userId) {
      throw new Error();
    }

    if (!heroId) {
      throw new Error();
    }

    await this.addFavoriteRepository.addFavorite({
      userId,
      heroId,
      favoriteName,
    });
  }
}

interface IAddFavoriteRepository {
  addFavorite({
    userId,
    heroId,
    favoriteName,
  }: AddFavoriteInput): Promise<void>;
}

class AddFavoriteRepositorySpy implements IAddFavoriteRepository {
  private userId = 0;
  private heroId = 0;
  private favoriteName = '';

  async addFavorite({
    favoriteName,
    userId,
    heroId,
  }: AddFavoriteInput): Promise<void> {
    this.userId = userId;
    this.heroId = heroId;
    this.favoriteName = favoriteName;
  }
}

const makeSut = () => {
  const addFavoriteRepositorySpy = new AddFavoriteRepositorySpy();
  const sut = new AddFavoriteUseCase(addFavoriteRepositorySpy);

  return sut;
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
  it('should throw an error if no favorite name is provided', () => {
    const sut = makeSut();

    expect(
      sut.execute({ favoriteName: '', userId: 3, heroId: 1234 })
    ).rejects.toThrow();
  });

  //FAZENDO
  it('should throw an error if the favorite name is less than 4 characters', () => {
    const sut = makeSut();

    expect(
      sut.execute({ favoriteName: 'Her', userId: 3, heroId: 1234 })
    ).rejects.toThrow();
  });

  it('should throw an error if the favorite name is longer than 15 characters', () => {
    const sut = makeSut();

    expect(
      sut.execute({
        favoriteName: 'Spider Man Hero 1',
        userId: 3,
        heroId: 1234,
      })
    ).rejects.toThrow();
  });

  it('should throw an error if no user id is provided', () => {
    const sut = makeSut();

    expect(
      sut.execute({ favoriteName: 'Favorite Test', userId: 0, heroId: 1234 })
    ).rejects.toThrow();
  });

  it('should throw an error if no hero id is provided', () => {
    const sut = makeSut();

    expect(
      sut.execute({ favoriteName: 'Favorite Test', userId: 3, heroId: 0 })
    ).rejects.toThrow();
  });

  it('should throw error if any dependency throws', () => {
    const sut = new AddFavoriteUseCase(makeAddFavoriteRepositoryWithError());

    expect(
      sut.execute({ favoriteName: 'Favorite Test', userId: 3, heroId: 1234 })
    ).rejects.toThrow();
  });
});
