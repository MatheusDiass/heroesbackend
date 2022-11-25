import { describe, it, expect } from 'vitest';
import { AddFavoriteRepositoryInMemory } from './add-favorite-repository-in-memory';

describe('Add Favorite Repository In-Memory', () => {
  it('should add a new favorite', () => {
    const sut = new AddFavoriteRepositoryInMemory();

    expect(
      sut.addFavorite({
        userId: 1,
        heroId: 1010727,
      })
    );
  });
});
