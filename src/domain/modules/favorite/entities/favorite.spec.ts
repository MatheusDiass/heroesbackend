import { describe, expect, it } from 'vitest';
import { MissingParameterError } from '../../../errors';
import { Favorite } from './favorite';

describe('Favorite Entity', () => {
  const favoriteProps = {
    id: 1,
    userId: 1,
    heroId: 1,
  };

  it('should throw MissingParameterError type error if it has no id and doesnt have a hero id in favorites', () => {
    expect(() => {
      new Favorite({
        userId: 1,
      });
    }).toThrow(MissingParameterError);
  });

  it('should return the same id informed in the creation of the favorite class instance', () => {
    const favorite = new Favorite({
      ...favoriteProps,
    });

    expect(favorite.getId).toEqual(favoriteProps.id);
  });

  it('should return the same user id informed in the creation of the favorite class instance', () => {
    const favorite = new Favorite({
      ...favoriteProps,
    });

    expect(favorite.getUserId).toEqual(favoriteProps.userId);
  });

  it('should return the same hero id informed in the creation of the favorite class instance', () => {
    const favorite = new Favorite({
      ...favoriteProps,
    });

    expect(favorite.getHeroId).toEqual(favoriteProps.heroId);
  });
});
