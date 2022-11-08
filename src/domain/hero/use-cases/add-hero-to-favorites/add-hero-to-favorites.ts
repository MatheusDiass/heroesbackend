import { AddHeroToFavorites, IAddHeroToFavoritesRepository } from '../../';

export class AddHeroToFavoritesUseCase {
  constructor(
    private readonly addHeroToFavoritesRepository: IAddHeroToFavoritesRepository
  ) {}

  async execute({ userId, heroId }: AddHeroToFavorites): Promise<void> {
    //Check if the user id has not been provided
    if (!userId) {
      throw new Error();
    }

    //Check if the hero id has not been provided
    if (!heroId) {
      throw new Error();
    }

    //Add hero to favorites
    await this.addHeroToFavoritesRepository.addHeroToFavorites({
      userId,
      heroId,
    });
  }
}
