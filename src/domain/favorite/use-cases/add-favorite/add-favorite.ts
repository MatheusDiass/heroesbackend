import { AddFavoriteInput, IAddFavoriteRepository } from '../..';

export class AddFavoriteUseCase {
  constructor(private readonly addFavoriteRepository: IAddFavoriteRepository) {}

  async execute({ userId, heroId }: AddFavoriteInput): Promise<void> {
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
    });
  }
}
