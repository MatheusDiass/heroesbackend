import { describe, expect, it, test } from 'vitest';
import { Hero } from '../../entities/hero';
import { FetchHeroesUseCase } from './fetch-heroes';
import { InvalidHeroesLimitInFilterError } from '../../errors';

class FetchHeroesRepository {
  async fetchHeroes(): Promise<Hero[]> {
    return [];
  }
}

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
  it('should throw InvalidHeroesLimitInFilterError type error if limit is greater than 100', () => {
    const sut = makeSut();
    const filter = {
      limit: 101,
      offset: 2,
    };

    expect(sut.execute(filter)).rejects.toThrow(
      InvalidHeroesLimitInFilterError
    );
  });

  it('should throw InvalidHeroesLimitInFilterError type error if limit is less than 1', () => {
    const sut = makeSut();
    const filter = {
      limit: 1,
      offset: 2,
    };

    expect(sut.execute(filter)).rejects.toThrow(
      InvalidHeroesLimitInFilterError
    );
  });

  test('if filter nameStartsWith property is empty if no value is passed', async () => {
    const sut = makeSut();
    const filter = {
      nameStartsWith: undefined,
      limit: 10,
      offset: 2,
    };

    await sut.execute(filter);
    expect(filter.nameStartsWith).toEqual('');
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
