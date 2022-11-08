import { AddHeroToFavorites } from '../../';

export interface IAddHeroToFavoritesRepository {
  addHeroToFavorites({ userId, heroId }: AddHeroToFavorites): Promise<void>;
}
