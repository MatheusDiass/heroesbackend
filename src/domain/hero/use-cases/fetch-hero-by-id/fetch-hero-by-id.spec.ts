import { describe, expect, it } from 'vitest';
import { Hero } from '../../';

class FetchHeroByIdUseCase {
  constructor(
    private readonly fetchHeroByIdRepository: FetchHeroByIdRepository
  ) {}

  async execute(id: number): Promise<Hero> {
    if (!id) {
      throw new Error();
    }

    const hero = await this.fetchHeroByIdRepository.fetchHeroById(id);

    return hero;
  }
}

class FetchHeroByIdRepository {
  async fetchHeroById(id: number): Promise<Hero> {
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
  it('should throw error if no id is provided or id is not correctly', () => {
    const fetchHeroByIdRepository = new FetchHeroByIdRepository();
    const sut = new FetchHeroByIdUseCase(fetchHeroByIdRepository);

    expect(sut.execute(0)).rejects.toThrow();
  });

  it('should return an instance of Hero', async () => {
    const fetchHeroByIdRepository = new FetchHeroByIdRepository();
    const sut = new FetchHeroByIdUseCase(fetchHeroByIdRepository);
    const hero = await sut.execute(10);

    expect(hero).toBeInstanceOf(Hero);
  });

  it('should throw error if any dependency throws', () => {
    const sut = new FetchHeroByIdUseCase(makeFetchHeroByIdRepositoryError());

    expect(sut.execute(1)).rejects.toThrow();
  });
});
