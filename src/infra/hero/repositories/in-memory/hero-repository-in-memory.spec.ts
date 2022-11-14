import { describe, it, expect } from 'vitest';
import { Hero } from '../../../../domain/hero';
import { HeroRepositoryInMemory } from './hero-repository-in-memory';

describe('Hero Repository In-Memory', () => {
  it('should return heroes', async () => {
    const sut = new HeroRepositoryInMemory();
    const heroes = await sut.fetchHeroes({});

    expect(heroes).toHaveLength(5);
  });

  it('should return an empty array if there are no heroes whose name starts with "American"', async () => {
    const sut = new HeroRepositoryInMemory();
    const heroes = await sut.fetchHeroes({
      nameStartsWith: 'American',
    });

    expect(heroes).toHaveLength(0);
  });

  it('should return a hero using the filter limit property', async () => {
    const sut = new HeroRepositoryInMemory();
    const heroes = await sut.fetchHeroes({
      limit: 1,
    });

    expect(heroes).toHaveLength(1);
  });

  it('should return a hero using the filter offset property', async () => {
    const sut = new HeroRepositoryInMemory();
    const heroes = await sut.fetchHeroes({
      offset: 4,
    });

    expect(heroes).toHaveLength(1);
  });

  it('should return a hero using all filter properties', async () => {
    const sut = new HeroRepositoryInMemory();
    const heroes = await sut.fetchHeroes({
      nameStartsWith: 'Iron',
      offset: 2,
      limit: 1,
    });

    expect(heroes).toHaveLength(1);
  });

  it('should return a hero by id', async () => {
    const sut = new HeroRepositoryInMemory();
    const heroes = await sut.fetchHeroById(1011318);

    expect(heroes).toBeInstanceOf(Hero);
  });

  it('should return undefined if no hero exists', async () => {
    const sut = new HeroRepositoryInMemory();
    const heroes = await sut.fetchHeroById(10);

    expect(heroes).toEqual(undefined);
  });
});
