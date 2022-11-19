import { FetchHeroesUseCase } from '../../../../domain/hero';
import { HeroRepositoryInMemory } from '../../../../infra/hero/repositories/in-memory/hero-repository-in-memory';

export const makeFetchHeroesUseCase = () => {
  const fetchHeroesRepository = new HeroRepositoryInMemory();
  return new FetchHeroesUseCase(fetchHeroesRepository);
};
