import { describe, expect, it } from 'vitest';

type AddFavoriteInput = {
  userId: number;
  heroId: number;
};

class AddFavoriteUseCase {
  constructor(private readonly addFavoriteRepository: IAddFavoriteRepository) {}

  async execute({ userId, heroId }: AddFavoriteInput): Promise<void> {
    if (!userId) {
      throw new Error();
    }

    if (!heroId) {
      throw new Error();
    }

    await this.addFavoriteRepository.addFavorite({
      userId,
      heroId,
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
  it('should throw an error if no user id is provided', () => {
    const sut = makeSut();

    expect(sut.execute({ userId: 0, heroId: 1234 })).rejects.toThrow();
  });

  it('should throw an error if no hero id is provided', () => {
    const sut = makeSut();

    expect(sut.execute({ userId: 3, heroId: 0 })).rejects.toThrow();
  });

  it('should throw error if any dependency throws', () => {
    const sut = new AddFavoriteUseCase(makeAddFavoriteRepositoryWithError());

    expect(sut.execute({ userId: 3, heroId: 1234 })).rejects.toThrow();
  });
});
