import { FetchHeroesUseCase } from '../../../../domain/hero';
import { FetchHeroesRepositoryInMemory } from '../../../../infra/hero/repositories/in-memory';

export const makeFetchHeroesUseCase = () => {
  const fetchHeroesRepository = new FetchHeroesRepositoryInMemory();
  return new FetchHeroesUseCase(fetchHeroesRepository);
};
