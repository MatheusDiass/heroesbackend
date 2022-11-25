import {
  IFetchFavoriteByIdRepository,
  IRemoveFavoriteRepository,
} from '../../';
import { MissingParameterError } from '../../../../errors';
import { FavoriteNotFoundError } from '../../errors';

export class RemoveFavoriteUseCase {
  constructor(
    private fetchFavoriteByIdRepository: IFetchFavoriteByIdRepository,
    private removeFavoriteRepository: IRemoveFavoriteRepository
  ) {}

  async execute(id: number): Promise<void> {
    if (!id) {
      throw new MissingParameterError('id');
    }

    const favorite = await this.fetchFavoriteByIdRepository.fetchFavoriteById(
      id
    );

    if (!favorite) {
      throw new FavoriteNotFoundError();
    }

    await this.removeFavoriteRepository.removeFavorite(id);
  }
}
