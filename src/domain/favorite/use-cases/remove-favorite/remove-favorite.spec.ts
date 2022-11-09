import { describe, expect, it } from 'vitest';
import { Favorite } from '../../entities/favorite';

class RemoveFavoriteUseCase {
  constructor(
    private fetchFavoriteByIdRepository: IFetchFavoriteByIdRepository,
    private removeFavoriteRepository: IRemoveFavoriteRepository
  ) {}

  async execute(id: number): Promise<void> {
    if (!id) {
      throw new Error();
    }

    const favorite = await this.fetchFavoriteByIdRepository.fetchFavoriteById(
      id
    );

    if (!favorite) {
      throw new Error();
    }

    await this.removeFavoriteRepository.removeFavorite(id);
  }
}

interface IFetchFavoriteByIdRepository {
  fetchFavoriteById(id: number): Promise<Favorite | undefined>;
}

class FetchFavoriteByIdRepositorySpy implements IFetchFavoriteByIdRepository {
  private favorites = [
    {
      id: 2,
      name: 'Spider Man Favorite',
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
      name: 'Iron Man Favorite',
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

interface IRemoveFavoriteRepository {
  removeFavorite(id: number): Promise<void>;
}

class RemoveFavoriteRepositorySpy implements IRemoveFavoriteRepository {
  private favoriteId = 0;

  async removeFavorite(id: number): Promise<void> {
    this.favoriteId = id;
  }
}

const makeSut = () => {
  const fetchFavoriteByIdRepositorySpy = new FetchFavoriteByIdRepositorySpy();
  const removeFavoriteSpy = new RemoveFavoriteRepositorySpy();
  const sut = new RemoveFavoriteUseCase(
    fetchFavoriteByIdRepositorySpy,
    removeFavoriteSpy
  );

  return sut;
};

const makeFetchFavoriteByIdRepositoryWithError = () => {
  class FetchFavoriteByIdRepositorySpy {
    async fetchFavoriteById(): Promise<Favorite | undefined> {
      throw new Error();
    }
  }

  return new FetchFavoriteByIdRepositorySpy();
};

const makeRemoveFavoriteRepositoryWithError = () => {
  class RemoveFavoriteRepositorySpy {
    async removeFavorite(): Promise<void> {
      throw new Error();
    }
  }

  return new RemoveFavoriteRepositorySpy();
};

describe('Remove Favorite Use Case', () => {
  it('should throw if no favorite id is provided', () => {
    const sut = makeSut();

    expect(sut.execute(0)).rejects.toThrow();
  });

  it('should throw an error if the favorite doesnt exist', () => {
    const sut = makeSut();

    expect(sut.execute(1)).rejects.toThrow();
  });

  it('should throw error if any dependency throws', () => {
    const sut = new RemoveFavoriteUseCase(
      makeFetchFavoriteByIdRepositoryWithError(),
      makeRemoveFavoriteRepositoryWithError()
    );

    expect(sut.execute(1)).rejects.toThrow();
  });
});
