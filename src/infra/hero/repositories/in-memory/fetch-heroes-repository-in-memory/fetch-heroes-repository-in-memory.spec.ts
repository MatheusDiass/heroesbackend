import { describe, it, expect } from 'vitest';
import { FetchHeroesRepositoryInMemory } from './fetch-heroes-repository-in-memory';

describe('Fetch Heroes Repository In-Memory', () => {
  it('should return heroes', async () => {
    const sut = new FetchHeroesRepositoryInMemory();
    const heroes = await sut.fetchHeroes({});

    expect(heroes).toHaveLength(5);
  });

  it('should return an empty array if there are no heroes whose name starts with "American"', async () => {
    const sut = new FetchHeroesRepositoryInMemory();
    const heroes = await sut.fetchHeroes({
      nameStartsWith: 'American',
    });

    expect(heroes).toHaveLength(0);
  });

  it('should return a hero using the filter limit property', async () => {
    const sut = new FetchHeroesRepositoryInMemory();
    const heroes = await sut.fetchHeroes({
      limit: 1,
    });

    expect(heroes).toHaveLength(1);
  });

  it('should return a hero using the filter offset property', async () => {
    const sut = new FetchHeroesRepositoryInMemory();
    const heroes = await sut.fetchHeroes({
      offset: 4,
    });

    expect(heroes).toHaveLength(1);
  });

  it('should return a hero using all filter properties', async () => {
    const sut = new FetchHeroesRepositoryInMemory();
    const heroes = await sut.fetchHeroes({
      nameStartsWith: 'Iron',
      offset: 2,
      limit: 1,
    });

    expect(heroes).toHaveLength(1);
  });
});
