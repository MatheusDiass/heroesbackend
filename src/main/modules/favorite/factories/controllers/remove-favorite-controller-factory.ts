import { RemoveFavoriteController } from '../../../../../presentation/modules/favorite/controllers';
import { makeRemoveFavoriteUseCase } from '../use-cases';

export const makeRemoveFavoriteController = () => {
  return new RemoveFavoriteController(makeRemoveFavoriteUseCase());
};
