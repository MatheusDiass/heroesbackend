import { describe, it, expect } from 'vitest';
import {
  Filter,
  Hero,
  IFetchHeroByIdRepository,
  IFetchHeroesRepository,
} from '../../../../domain/hero';
import { HeroAdapter } from '../../adapters';
import { heroesData } from './heroes-mock';

class HeroRepositoryInMemory
  implements IFetchHeroesRepository, IFetchHeroByIdRepository
{
  async fetchHeroes(filter: Filter): Promise<Hero[]> {
    let heroes: any[] = [];
    const startWith: string = filter.startWith || '';
    const limit: number = filter.limit || 0;
    const offset: number = filter.offset || 0;

    heroes = heroesData.slice(offset);

    heroes = heroes.filter((hero) => hero.name.startsWith(startWith));

    if (limit) {
      heroes = heroes.slice(0, limit);
    }

    return heroes.map((hero) => HeroAdapter.fromJson(hero));
  }

  async fetchHeroById(id: number): Promise<Hero | undefined> {
    const hero = heroesData.find((hero) => hero.id === id);

    if (!hero) {
      return undefined;
    }

    return HeroAdapter.fromJson(hero);
  }
}

describe('Hero Repository In-Memory', () => {
  it('should return heroes', async () => {
    const sut = new HeroRepositoryInMemory();
    const heroes = await sut.fetchHeroes({});

    expect(heroes).toHaveLength(5);
  });

  it('should return an empty array if there are no heroes whose name starts with "American"', async () => {
    const sut = new HeroRepositoryInMemory();
    const heroes = await sut.fetchHeroes({
      startWith: 'American',
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
      startWith: 'Iron',
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
