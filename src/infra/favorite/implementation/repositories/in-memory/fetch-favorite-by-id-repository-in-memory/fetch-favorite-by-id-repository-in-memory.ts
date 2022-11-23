import {
  Favorite,
  IFetchFavoriteByIdRepository,
} from '../../../../../../domain/favorite';
import { database } from '../../../../../database-in-memory';
import { FavoriteAdapter } from '../../../../adapters';

export class FetchFavoriteByIdRepositoryInMemory
  implements IFetchFavoriteByIdRepository
{
  async fetchFavoriteById(id: number): Promise<Favorite | undefined> {
    const favorite = database.favorites.find(
      (favorite: any) => favorite.favorite_id === id
    );

    if (!favorite) {
      return undefined;
    }

    return FavoriteAdapter.fromJson({
      ...favorite,
    });
  }
}
