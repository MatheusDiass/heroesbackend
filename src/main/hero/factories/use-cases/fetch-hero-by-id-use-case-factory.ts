import { FetchHeroByIdUseCase } from '../../../../domain/hero';
import { FetchHeroByIdRepositoryInMemory } from '../../../../infra/hero/repositories/in-memory';

export const makeFetchHeroByIdUseCase = () => {
  const fetchHeroByIdRepository = new FetchHeroByIdRepositoryInMemory();
  return new FetchHeroByIdUseCase(fetchHeroByIdRepository);
};
