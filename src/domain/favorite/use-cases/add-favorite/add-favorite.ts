import { AddFavoriteInput, IAddFavoriteRepository } from '../..';

export class AddFavoriteUseCase {
  constructor(private readonly addFavoriteRepository: IAddFavoriteRepository) {}

  async execute({
    userId,
    heroId,
    favoriteName,
  }: AddFavoriteInput): Promise<void> {
    //Check if the favorite name is empty
    if (favoriteName.trim() === '') {
      throw new Error();
    }

    //Check if the favorite name is less than 4 characters
    if (favoriteName.length < 4) {
      throw new Error();
    }

    //Check if the favorite name is longer than 15 characters
    if (favoriteName.length > 15) {
      throw new Error();
    }

    //Check if the user id has not been provided
    if (!userId) {
      throw new Error();
    }

    //Check if the hero id has not been provided
    if (!heroId) {
      throw new Error();
    }

    //Add hero to favorites
    await this.addFavoriteRepository.addFavorite({
      userId,
      heroId,
      favoriteName,
    });
  }
}
