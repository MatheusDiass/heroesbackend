import { describe, it, expect } from 'vitest';
import { FetchFavoriteByIdRepositoryInMemory } from './fetch-favorite-by-id-repository-in-memory';

describe('Fetch Favorite By Id Repository In-Memory', () => {
  it('should return favorite by id', async () => {
    const sut = new FetchFavoriteByIdRepositoryInMemory();
    const favorite = await sut.fetchFavoriteById(1);

    expect(favorite?.getId).toEqual(1);
    expect(favorite?.getUserId).toEqual(1);
    expect(favorite?.getHeroId).toEqual(1010727);
  });
});
