import { AddFavoriteUseCase } from '../../../../domain/favorite';
import { AddFavoriteRepositoryInMemory } from '../../../../infra/favorite/implementation/repositories/in-memory';
import { FetchHeroByIdRepositoryInMemory } from '../../../../infra/hero/repositories/in-memory';
import { FetchUserByIdRepositoryInMemory } from '../../../../infra/user/implementation/repositories/in-memory';

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
