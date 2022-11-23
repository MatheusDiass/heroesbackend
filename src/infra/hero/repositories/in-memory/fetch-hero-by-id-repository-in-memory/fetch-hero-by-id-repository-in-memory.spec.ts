import { describe, it, expect } from 'vitest';
import { Hero } from '../../../../../domain/hero';
import { FetchHeroByIdRepositoryInMemory } from './fetch-hero-by-id-repository-in-memory';

describe('Fetch Hero By Id Repository In-Memory', () => {
  it('should return a hero by id', async () => {
    const sut = new FetchHeroByIdRepositoryInMemory();
    const heroes = await sut.fetchHeroById(1011318);

    expect(heroes).toBeInstanceOf(Hero);
  });

  it('should return undefined if no hero exists', async () => {
    const sut = new FetchHeroByIdRepositoryInMemory();
    const heroes = await sut.fetchHeroById(10);

    expect(heroes).toEqual(undefined);
  });
});
