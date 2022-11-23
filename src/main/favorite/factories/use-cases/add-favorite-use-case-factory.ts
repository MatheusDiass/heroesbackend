import { AddFavoriteUseCase } from '../../../../domain/favorite';
import { AddFavoriteRepositoryInMemory } from '../../../../infra/favorite/implementation/repositories/in-memory';
import { FetchHeroByIdRepositoryInMemory } from '../../../../infra/hero/repositories/in-memory';
import { UserRepositoryInMemory } from '../../../../infra/user/implementation/repositories/in-memory/user-repository-in-memory';

export const makeAddFavoriteUseCase = () => {
  const fetchUserByIdRepository = new UserRepositoryInMemory();
  const fetchHeroByIdRepository = new FetchHeroByIdRepositoryInMemory();
  const addFavoriteRepository = new AddFavoriteRepositoryInMemory();
  return new AddFavoriteUseCase(
    fetchUserByIdRepository,
    fetchHeroByIdRepository,
    addFavoriteRepository
  );
};
