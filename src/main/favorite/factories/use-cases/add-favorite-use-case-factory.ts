import { AddFavoriteUseCase } from '../../../../domain/favorite';
import { FavoriteRepositoryInMemory } from '../../../../infra/favorite/implementation/repositories/in-memory/favorite-repository-in-memory';
import { HeroRepositoryInMemory } from '../../../../infra/hero/repositories/in-memory/hero-repository-in-memory';
import { UserRepositoryInMemory } from '../../../../infra/user/implementation/repositories/in-memory/user-repository-in-memory';

export const makeAddFavoriteUseCase = () => {
  const fetchUserByIdRepository = new UserRepositoryInMemory();
  const fetchHeroByIdRepository = new HeroRepositoryInMemory();
  const addFavoriteRepository = new FavoriteRepositoryInMemory();
  return new AddFavoriteUseCase(
    fetchUserByIdRepository,
    fetchHeroByIdRepository,
    addFavoriteRepository
  );
};
