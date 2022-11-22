import { FetchFavoriteByIdUseCase } from '../../../../domain/favorite';
import { FavoriteRepositoryInMemory } from '../../../../infra/favorite/implementation/repositories/in-memory/favorite-repository-in-memory';

export const makeFetchFavoriteByIdUseCase = () => {
  const fetchFavoritesByIdRepository = new FavoriteRepositoryInMemory();
  return new FetchFavoriteByIdUseCase(fetchFavoritesByIdRepository);
};
