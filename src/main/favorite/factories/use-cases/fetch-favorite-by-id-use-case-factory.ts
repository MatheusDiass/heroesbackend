import { FetchFavoriteByIdUseCase } from '../../../../domain/favorite';
import { FetchFavoriteByIdRepositoryInMemory } from '../../../../infra/favorite/implementation/repositories/in-memory';

export const makeFetchFavoriteByIdUseCase = () => {
  const fetchFavoritesByIdRepository =
    new FetchFavoriteByIdRepositoryInMemory();
  return new FetchFavoriteByIdUseCase(fetchFavoritesByIdRepository);
};
