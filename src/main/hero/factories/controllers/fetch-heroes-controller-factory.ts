import { FetchHeroesController } from '../../../../presentation/hero/controllers/fetch-heroes-controller';
import { makeFetchHeroesUseCase } from '../use-cases/fetch-heroes-use-case-factory';

export const makeFetchHeroesController = () => {
  return new FetchHeroesController(makeFetchHeroesUseCase());
};
