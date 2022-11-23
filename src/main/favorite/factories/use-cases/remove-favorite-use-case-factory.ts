import { RemoveFavoriteUseCase } from '../../../../domain/favorite';
import {
  FetchFavoriteByIdRepositoryInMemory,
  RemoveFavoriteRepositoryInMemory,
} from '../../../../infra/favorite/implementation/repositories/in-memory';

export const makeRemoveFavoriteUseCase = () => {
  const fetchFavoriteByIdRepository = new FetchFavoriteByIdRepositoryInMemory();
  const removeFavoriteRepository = new RemoveFavoriteRepositoryInMemory();
  return new RemoveFavoriteUseCase(
    fetchFavoriteByIdRepository,
    removeFavoriteRepository
  );
};
