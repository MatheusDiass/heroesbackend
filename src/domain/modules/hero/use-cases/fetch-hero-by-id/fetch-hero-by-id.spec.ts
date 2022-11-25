import { describe, expect, it } from 'vitest';
import { Hero } from '../../';
import { FetchHeroByIdUseCase } from './fetch-hero-by-id';
import { MissingParameterError } from '../../../../errors';
import { HeroNotFoundError } from '../../errors';

class FetchHeroByIdRepository {
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

const makeFetchHeroByIdRepositoryError = () => {
  class FetchHeroByIdRepository {
    fetchHeroById(): Promise<Hero> {
      throw new Error();
    }
  }

  return new FetchHeroByIdRepository();
};

describe('Fetch Hero by Id Use Case', () => {
  it('should throw MissingParameterError type error if no id is provided', () => {
    const fetchHeroByIdRepository = new FetchHeroByIdRepository();
    const sut = new FetchHeroByIdUseCase(fetchHeroByIdRepository);

    expect(sut.execute(0)).rejects.toThrow(MissingParameterError);
  });

  it('should return an instance of Hero', async () => {
    const fetchHeroByIdRepository = new FetchHeroByIdRepository();
    const sut = new FetchHeroByIdUseCase(fetchHeroByIdRepository);
    const hero = await sut.execute(10);

    expect(hero).toBeInstanceOf(Hero);
  });

  it('should throw HeroNotFoundError type error if the hero does not exist', () => {
    const fetchHeroByIdRepository = new FetchHeroByIdRepository();
    const sut = new FetchHeroByIdUseCase(fetchHeroByIdRepository);

    expect(sut.execute(1)).rejects.toThrow(HeroNotFoundError);
  });

  it('should throw error if any dependency throws', () => {
    const sut = new FetchHeroByIdUseCase(makeFetchHeroByIdRepositoryError());

    expect(sut.execute(1)).rejects.toThrow();
  });
});
