import { describe, expect, it } from 'vitest';
import { Favorite } from './favorite';

describe('Favorite Entity', () => {
  const favoriteProps = {
    id: 1,
    userId: 1,
    heroId: 1,
    hero: {
      id: 1,
      name: 'Spider Man',
      description: 'Its the Spider Man',
      image: 'spiderman.png',
      stories: [],
      events: [],
    },
  };

  it('should throw an error if it has id and doesnt have a hero in favorite', () => {
    expect(() => {
      new Favorite({
        id: 1,
        userId: 1,
      });
    }).toThrow();
  });

  it('should throw an error if it has no id and doesnt have a hero id in favorites', () => {
    expect(() => {
      new Favorite({
        userId: 1,
      });
    }).toThrow();
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

  it('should return the same hero informed in the creation of the favorite class instance', () => {
    const favorite = new Favorite({
      ...favoriteProps,
    });

    expect(favorite.getHero).toEqual(favoriteProps.hero);
  });
});
