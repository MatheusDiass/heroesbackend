import { describe, expect, it, test } from 'vitest';
import { Hero } from '../../entities/hero';

class FetchHeroesUseCase {
  constructor(private readonly fetchHeroesRepository: FetchHeroesRepository) {}

  async execute(filter: Filter): Promise<Hero[]> {
    if (!filter.startWith) {
      filter.startWith = '';
    }

    if (filter.limit && (filter.limit > 100 || filter.limit < 0)) {
      throw new Error();
    }

    if (!filter.limit) {
      filter.limit = 0;
    }

    if (!filter.offset) {
      filter.offset = 0;
    }

    const heroes = await this.fetchHeroesRepository.fetchHeroes();
    return heroes;
  }
}

class FetchHeroesRepository {
  async fetchHeroes(): Promise<Hero[]> {
    return [];
  }
}

type Filter = {
  startWith?: string;
  limit?: number;
  offset?: number;
};

const makeSut = () => {
  const fetchHeroesRepository = new FetchHeroesRepository();
  const sut = new FetchHeroesUseCase(fetchHeroesRepository);

  return sut;
};

const makeFetchHeroesRepositoryError = () => {
  class FetchHeroesRepository {
    async fetchHeroes(): Promise<Hero[]> {
      throw new Error();
    }
  }

  return new FetchHeroesRepository();
};

describe('Fetch Heroes Use Case', () => {
  it('should throw error if paging limit is greater than 100', () => {
    const sut = makeSut();
    const filter = {
      limit: 101,
      offset: 2,
    };

    expect(sut.execute(filter)).rejects.toThrow();
  });

  it('should throw error if paging limit is less than 100', () => {
    const sut = makeSut();
    const filter = {
      limit: -1,
      offset: 2,
    };

    expect(sut.execute(filter)).rejects.toThrow();
  });

  test('if filter startWith property is empty if no value is passed', async () => {
    const sut = makeSut();
    const filter = {
      startWith: undefined,
      limit: 10,
      offset: 2,
    };

    await sut.execute(filter);
    expect(filter.startWith).toEqual('');
  });

  test('if filter limit property is 0 if no value is passed', async () => {
    const sut = makeSut();
    const filter = {
      limit: undefined,
      offset: 2,
    };

    await sut.execute(filter);
    expect(filter.limit).toEqual(0);
  });

  test('if filter offset property is 0 if no value is passed', async () => {
    const sut = makeSut();
    const filter = {
      limit: 10,
      offset: undefined,
    };

    await sut.execute(filter);
    expect(filter.offset).toEqual(0);
  });

  it('should throw error if any dependency throws', () => {
    const sut = new FetchHeroesUseCase(makeFetchHeroesRepositoryError());
    const filter = {
      limit: 10,
      offset: 2,
    };

    expect(sut.execute(filter)).rejects.toThrow();
  });
});
