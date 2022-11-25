import { Favorite } from '../../../../domain/modules/favorite';

export abstract class FavoriteAdapter {
  //Maps json to a user entity
  static fromJson(obj: any): Favorite {
    return new Favorite({
      id: obj.favorite_id,
      userId: obj.favorite_userid,
      heroId: obj.favorite_heroid,
    });
  }

  //Maps user entity to a JSON
  static toJson(favorite: Favorite): any {
    return {
      favorite_id: favorite.getId,
      favorite_userid: favorite.getUserId,
      favorite_heroid: favorite.getHeroId,
    };
  }
}
