export interface IRemoveFavoriteRepository {
  removeFavorite(id: number): Promise<void>;
}
