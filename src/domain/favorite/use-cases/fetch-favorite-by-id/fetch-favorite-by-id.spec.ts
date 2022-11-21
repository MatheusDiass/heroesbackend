import { describe, expect, it } from 'vitest';
import { FetchFavoriteByIdUseCase } from './fetch-favorite-by-id';
import { IFetchFavoriteByIdRepository } from '../../contracts';
import { Favorite } from '../../entities/favorite';

class FetchFavoriteByIdRepositorySpy implements IFetchFavoriteByIdRepository {
  private favorites = [
    {
      id: 2,
      userId: 1,
      heroId: 1,
      hero: {
        id: 1,
        name: 'Spider Man',
        description: 'Spider Man Description',
        image: 'spiderman.png',
        stories: [],
        events: [],
      },
    },
    {
      id: 3,
      userId: 1,
      heroId: 1,
      hero: {
        id: 2,
        name: 'Iron Man',
        description: 'Iron Man Description',
        image: 'ironman.png',
        stories: [],
        events: [],
      },
    },
  ];

  async fetchFavoriteById(id: number): Promise<Favorite | undefined> {
    const favorite = this.favorites.find((favorite) => favorite.id === id);

    if (!favorite) {
      return undefined;
    }

    return new Favorite({
      ...favorite,
    });
  }
}

const makeFetchFavoriteByIdRepositoryWithError = () => {
  class FetchFavoriteByIdRepositorySpy {
    async fetchFavoriteById(): Promise<Favorite | undefined> {
      throw new Error();
    }
  }

  return new FetchFavoriteByIdRepositorySpy();
};

describe('Fetch Favorite By Id Use Case', () => {
  it('should throw error if no id is provided or id is not correctly', () => {
    const fetchFavoriteByIdRepository = new FetchFavoriteByIdRepositorySpy();
    const sut = new FetchFavoriteByIdUseCase(fetchFavoriteByIdRepository);

    expect(sut.execute(0)).rejects.toThrow();
  });

  it('should return an instance of Favorite', async () => {
    const fetchFavoriteByIdRepository = new FetchFavoriteByIdRepositorySpy();
    const sut = new FetchFavoriteByIdUseCase(fetchFavoriteByIdRepository);

    const favorite = await sut.execute(2);

    expect(favorite).toBeInstanceOf(Favorite);
  });

  it('should throw an error if favorite does not exist', () => {
    const fetchFavoriteByIdRepository = new FetchFavoriteByIdRepositorySpy();
    const sut = new FetchFavoriteByIdUseCase(fetchFavoriteByIdRepository);

    expect(sut.execute(1)).rejects.toThrow();
  });

  it('should throw error if any dependency throws', () => {
    const sut = new FetchFavoriteByIdUseCase(
      makeFetchFavoriteByIdRepositoryWithError()
    );

    expect(sut.execute(1)).rejects.toThrow();
  });
});
