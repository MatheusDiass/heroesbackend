import { AddFavoriteUseCase } from '../../../../domain/favorite';
import { AddFavoriteRepositoryInMemory } from '../../../../infra/favorite/implementation/repositories/in-memory';
import { HeroRepositoryInMemory } from '../../../../infra/hero/repositories/in-memory/hero-repository-in-memory';
import { UserRepositoryInMemory } from '../../../../infra/user/implementation/repositories/in-memory/user-repository-in-memory';

export const makeAddFavoriteUseCase = () => {
  const fetchUserByIdRepository = new UserRepositoryInMemory();
  const fetchHeroByIdRepository = new HeroRepositoryInMemory();
  const addFavoriteRepository = new AddFavoriteRepositoryInMemory();
  return new AddFavoriteUseCase(
    fetchUserByIdRepository,
    fetchHeroByIdRepository,
    addFavoriteRepository
  );
};
