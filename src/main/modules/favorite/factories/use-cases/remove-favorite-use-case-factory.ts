import { RemoveFavoriteUseCase } from '../../../../../domain/modules/favorite';
import {
  FetchFavoriteByIdRepositoryInMemory,
  RemoveFavoriteRepositoryInMemory,
} from '../../../../../infra/modules/favorite/implementation/repositories/in-memory';

export const makeRemoveFavoriteUseCase = () => {
  const fetchFavoriteByIdRepository = new FetchFavoriteByIdRepositoryInMemory();
  const removeFavoriteRepository = new RemoveFavoriteRepositoryInMemory();
  return new RemoveFavoriteUseCase(
    fetchFavoriteByIdRepository,
    removeFavoriteRepository
  );
};
