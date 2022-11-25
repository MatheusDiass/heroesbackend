import { IRemoveFavoriteRepository } from '../../../../../../../domain/modules/favorite';
import { database } from '../../../../../../database-in-memory';

export class RemoveFavoriteRepositoryInMemory
  implements IRemoveFavoriteRepository
{
  async removeFavorite(id: number): Promise<void> {
    const index = database.favorites.findIndex(
      (favorite: any) => favorite.favorite_id === id
    );

    database.favorites.splice(index, 1);
  }
}
