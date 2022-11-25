import { FetchFavoriteByIdUseCase } from '../../../../../domain/modules/favorite';
import { FetchFavoriteByIdRepositoryInMemory } from '../../../../../infra/modules/favorite/implementation/repositories/in-memory';

export const makeFetchFavoriteByIdUseCase = () => {
  const fetchFavoritesByIdRepository =
    new FetchFavoriteByIdRepositoryInMemory();
  return new FetchFavoriteByIdUseCase(fetchFavoritesByIdRepository);
};
