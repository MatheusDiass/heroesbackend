import { describe, it, expect } from 'vitest';
import { RemoveFavoriteRepositoryInMemory } from './remove-favorite-repository-in-memory';

describe('Remove Favorite Repository In-Memory', () => {
  it('should remove favorite', async () => {
    const sut = new RemoveFavoriteRepositoryInMemory();

    expect(sut.removeFavorite(1));
  });
});
