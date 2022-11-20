import { FetchHeroByIdController } from '../../../../presentation/hero/controllers';
import { makeFetchHeroByIdUseCase } from '../use-cases';

export const makeFetchHeroByIdController = () => {
  return new FetchHeroByIdController(makeFetchHeroByIdUseCase());
};
