import {
  IFetchFavoriteByIdRepository,
  IRemoveFavoriteRepository,
} from '../../';

export class RemoveFavoriteUseCase {
  constructor(
    private fetchFavoriteByIdRepository: IFetchFavoriteByIdRepository,
    private removeFavoriteRepository: IRemoveFavoriteRepository
  ) {}

  async execute(id: number): Promise<void> {
    if (!id) {
      throw new Error();
    }

    const favorite = await this.fetchFavoriteByIdRepository.fetchFavoriteById(
      id
    );

    if (!favorite) {
      throw new Error();
    }

    await this.removeFavoriteRepository.removeFavorite(id);
  }
}
