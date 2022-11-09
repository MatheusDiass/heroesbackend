import { Favorite } from '../../entities/favorite';

export interface IFetchFavoriteByIdRepository {
  fetchFavoriteById(id: number): Promise<Favorite | undefined>;
}
