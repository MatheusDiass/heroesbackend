import { AddFavoriteInput } from '../../';

export interface IAddFavoriteRepository {
  addFavorite({ userId, heroId }: AddFavoriteInput): Promise<void>;
}
