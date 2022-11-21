import { Favorite } from '../../../domain/favorite';

export abstract class FavoriteAdapter {
  //Maps json to a user entity
  static fromJson(obj: any): Favorite {
    return new Favorite({
      id: obj.favorite_id,
      userId: obj.favorite_userid,
      heroId: obj.favorite_heroid,
      hero: obj.favorite_hero,
    });
  }

  //Maps user entity to a JSON
  static toJson(favorite: Favorite): any {
    return {
      favorite_id: favorite.getId,
      favorite_userid: favorite.getUserId,
      favorite_heroid: favorite.getHeroId,
      favorite_hero: favorite.getHero,
    };
  }
}
