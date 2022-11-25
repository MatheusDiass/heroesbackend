import { FetchHeroByIdUseCase } from '../../../../../domain/modules/hero';
import { FetchHeroByIdRepositoryInMemory } from '../../../../../infra/modules/hero/repositories/in-memory';

export const makeFetchHeroByIdUseCase = () => {
  const fetchHeroByIdRepository = new FetchHeroByIdRepositoryInMemory();
  return new FetchHeroByIdUseCase(fetchHeroByIdRepository);
};
