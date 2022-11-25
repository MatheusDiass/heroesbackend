import { Favorite, IFetchFavoriteByIdRepository } from '../../';
import { MissingParameterError } from '../../../../errors';
import { FavoriteNotFoundError } from '../../errors';

export class FetchFavoriteByIdUseCase {
  constructor(
    private fetchFavoritesByIdRepository: IFetchFavoriteByIdRepository
  ) {}

  async execute(id: number): Promise<Favorite | undefined> {
    if (!id) {
      throw new MissingParameterError('id');
    }

    const favorite = await this.fetchFavoritesByIdRepository.fetchFavoriteById(
      id
    );

    if (!favorite) {
      throw new FavoriteNotFoundError();
    }

    return favorite;
  }
}
