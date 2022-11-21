import { describe, expect, it } from 'vitest';
import { FavoriteRepositoryInMemory } from './favorite-repository-in-memory';

describe('Favorite Repository In-Memory', () => {
  it('should add a new favorite', () => {
    const sut = new FavoriteRepositoryInMemory();

    expect(
      sut.addFavorite({
        userId: 1,
        heroId: 1010727,
      })
    );
  });

  it('should return favorite by id', async () => {
    const sut = new FavoriteRepositoryInMemory();
    await sut.addFavorite({
      userId: 1,
      heroId: 1010727,
    });
    const favorite = await sut.fetchFavoriteById(1);

    expect(favorite?.getId).toEqual(1);
    expect(favorite?.getUserId).toEqual(1);
    expect(favorite?.getHeroId).toEqual(1010727);
  });

  it('should return undefined if the favorite does not exist', async () => {
    const sut = new FavoriteRepositoryInMemory();
    const favorite = await sut.fetchFavoriteById(2);

    expect(favorite).toBeUndefined();
  });

  it('should remove favorite', async () => {
    const sut = new FavoriteRepositoryInMemory();

    expect(sut.removeFavorite(1));
  });
});
