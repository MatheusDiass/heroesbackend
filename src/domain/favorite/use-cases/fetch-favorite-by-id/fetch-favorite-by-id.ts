import { Favorite, IFetchFavoriteByIdRepository } from '../../';

export class FetchFavoriteByIdUseCase {
  constructor(
    private fetchFavoritesByIdRepository: IFetchFavoriteByIdRepository
  ) {}

  async execute(id: number): Promise<Favorite | undefined> {
    if (!id) {
      throw new Error();
    }

    const favorite = await this.fetchFavoritesByIdRepository.fetchFavoriteById(
      id
    );

    if (!favorite) {
      throw new Error();
    }

    return favorite;
  }
}
