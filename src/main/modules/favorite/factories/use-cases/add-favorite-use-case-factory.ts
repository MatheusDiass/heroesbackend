import { AddFavoriteUseCase } from '../../../../../domain/modules/favorite';
import { AddFavoriteRepositoryInMemory } from '../../../../../infra/modules/favorite/implementation/repositories/in-memory';
import { FetchHeroByIdRepositoryInMemory } from '../../../../../infra/modules/hero/repositories/in-memory';
import { FetchUserByIdRepositoryInMemory } from '../../../../../infra/modules/user/implementation/repositories/in-memory';

export const makeAddFavoriteUseCase = () => {
  const fetchUserByIdRepository = new FetchUserByIdRepositoryInMemory();
  const fetchHeroByIdRepository = new FetchHeroByIdRepositoryInMemory();
  const addFavoriteRepository = new AddFavoriteRepositoryInMemory();
  return new AddFavoriteUseCase(
    fetchUserByIdRepository,
    fetchHeroByIdRepository,
    addFavoriteRepository
  );
};
