import { FetchHeroByIdUseCase } from '../../../../domain/hero';
import { HeroRepositoryInMemory } from '../../../../infra/hero/repositories/in-memory/hero-repository-in-memory';

export const makeFetchHeroByIdUseCase = () => {
  const fetchHeroByIdRepository = new HeroRepositoryInMemory();
  return new FetchHeroByIdUseCase(fetchHeroByIdRepository);
};
