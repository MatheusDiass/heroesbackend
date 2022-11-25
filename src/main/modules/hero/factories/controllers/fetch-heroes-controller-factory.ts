import { FetchHeroesController } from '../../../../../presentation/modules/hero/controllers';
import { makeFetchHeroesUseCase } from '../use-cases/fetch-heroes-use-case-factory';

export const makeFetchHeroesController = () => {
  return new FetchHeroesController(makeFetchHeroesUseCase());
};
