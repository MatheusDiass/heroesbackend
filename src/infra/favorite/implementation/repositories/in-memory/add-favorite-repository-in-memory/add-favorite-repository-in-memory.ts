import {
  AddFavoriteInput,
  IAddFavoriteRepository,
} from '../../../../../../domain/favorite';
import { database } from '../../../../../database-in-memory';

export class AddFavoriteRepositoryInMemory implements IAddFavoriteRepository {
  async addFavorite({ userId, heroId }: AddFavoriteInput): Promise<void> {
    database.favorites.push({
      favorite_id: Math.floor(Math.random() * (999999 - 3) + 3),
      favorite_userid: userId,
      favorite_heroid: heroId,
    });
  }
}
