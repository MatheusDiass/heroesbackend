import {
  AddFavoriteInput,
  Favorite,
  IAddFavoriteRepository,
  IFetchFavoriteByIdRepository,
  IRemoveFavoriteRepository,
} from '../../../../../domain/favorite';
import { database } from '../../../../database-in-memory';
import { FavoriteAdapter } from '../../../adapters';

export class FavoriteRepositoryInMemory
  implements
    IAddFavoriteRepository,
    IFetchFavoriteByIdRepository,
    IRemoveFavoriteRepository
{
  async addFavorite({ userId, heroId }: AddFavoriteInput): Promise<void> {
    database.favorites.push({
      favorite_id: Math.floor(Math.random() * (999999 - 3) + 3),
      favorite_userid: userId,
      favorite_heroid: heroId,
    });
  }

  async fetchFavoriteById(id: number): Promise<Favorite | undefined> {
    const favorite = database.favorites.find(
      (favorite: any) => favorite.favorite_id === id
    );

    if (!favorite) {
      return undefined;
    }

    const hero = database.heroes.find(
      (hero: any) => hero.id === favorite.favorite_heroid
    );

    return FavoriteAdapter.fromJson({
      ...favorite,
      favorite_hero: hero,
    });
  }

  async removeFavorite(id: number): Promise<void> {
    const index = database.favorites.findIndex(
      (favorite: any) => favorite.favorite_id === id
    );

    database.favorites.splice(index, 1);
  }
}
