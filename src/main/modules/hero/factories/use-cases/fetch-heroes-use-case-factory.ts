import { FetchHeroesUseCase } from '../../../../../domain/modules/hero';
import { FetchHeroesRepositoryInMemory } from '../../../../../infra/modules/hero/repositories/in-memory';

export const makeFetchHeroesUseCase = () => {
  const fetchHeroesRepository = new FetchHeroesRepositoryInMemory();
  return new FetchHeroesUseCase(fetchHeroesRepository);
};
