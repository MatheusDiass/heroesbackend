import { describe, expect, it } from 'vitest';
import { Favorite } from '../../../domain/favorite';
import { FavoriteAdapter } from './favorite-adapter';

describe('Favorite Adapter', () => {
  it('should maps a json to a favorite entity', () => {
    const favoriteData = {
      favorite_id: 1,
      favorite_userid: 1,
      favorite_heroid: 1,
      favorite_hero: {
        id: 1,
        name: 'Spider Man',
        description: 'Its the Spider Man',
        image: 'spiderman.png',
        stories: [],
        events: [],
      },
    };

    const favorite = FavoriteAdapter.fromJson(favoriteData);

    expect(favoriteData.favorite_id).toEqual(favorite.getId);
    expect(favoriteData.favorite_userid).toEqual(favorite.getUserId);
    expect(favoriteData.favorite_heroid).toEqual(favorite.getHeroId);
    expect(favoriteData.favorite_hero).toEqual(favorite.getHero);
  });

  it('should maps a favorite entity to a json', () => {
    const favorite = new Favorite({
      id: 1,
      userId: 1,
      heroId: 1,
      hero: {
        id: 1,
        name: 'Spider Man',
        description: 'Its The Spider Man',
        image: 'spiderman.png',
        stories: [],
        events: [],
      },
    });

    const favoriteObj = FavoriteAdapter.toJson(favorite);

    expect(favorite.getId).toEqual(favoriteObj.favorite_id);
    expect(favorite.getUserId).toEqual(favoriteObj.favorite_userid);
    expect(favorite.getHeroId).toEqual(favoriteObj.favorite_heroid);
    expect(favorite.getHero).toEqual(favoriteObj.favorite_hero);
  });
});
