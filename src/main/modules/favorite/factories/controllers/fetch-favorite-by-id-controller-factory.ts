import { FetchFavoriteByIdController } from '../../../../../presentation/modules/favorite/controllers';
import { makeFetchFavoriteByIdUseCase } from '../use-cases/fetch-favorite-by-id-use-case-factory';

export const makeFetchFavoriteByIdController = () => {
  return new FetchFavoriteByIdController(makeFetchFavoriteByIdUseCase());
};
