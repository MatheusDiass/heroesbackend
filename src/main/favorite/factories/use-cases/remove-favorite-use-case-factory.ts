import { RemoveFavoriteUseCase } from '../../../../domain/favorite';
import { FavoriteRepositoryInMemory } from '../../../../infra/favorite/implementation/repositories/in-memory/favorite-repository-in-memory';

export const makeRemoveFavoriteUseCase = () => {
  const fetchFavoriteByIdRepository = new FavoriteRepositoryInMemory();
  const removeFavoriteRepository = new FavoriteRepositoryInMemory();
  return new RemoveFavoriteUseCase(
    fetchFavoriteByIdRepository,
    removeFavoriteRepository
  );
};
