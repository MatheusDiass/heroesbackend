import { AddFavoriteController } from '../../../../../presentation/modules/favorite/controllers';
import { makeAddFavoriteUseCase } from '../use-cases';

export const makeAddFavoriteController = () => {
  return new AddFavoriteController(makeAddFavoriteUseCase());
};
