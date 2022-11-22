import { AddFavoriteInput, IAddFavoriteRepository } from '../..';
import { IFetchHeroByIdRepository } from '../../../hero';
import { IFetchUserByIdRepository } from '../../../user';

export class AddFavoriteUseCase {
  constructor(
    private readonly fetchUserByIdRepository: IFetchUserByIdRepository,
    private readonly fetchHeroByIdRepository: IFetchHeroByIdRepository,
    private readonly addFavoriteRepository: IAddFavoriteRepository
  ) {}

  async execute({ userId, heroId }: AddFavoriteInput): Promise<void> {
    //Check if the user id has not been provided
    if (!userId) {
      throw new Error();
    }

    //Check if the user does not exist
    const user = await this.fetchUserByIdRepository.fetchUserById(userId);

    if (!user) {
      throw new Error();
    }

    //Check if the hero id has not been provided
    if (!heroId) {
      throw new Error();
    }

    //Check if the hero does not exist
    const hero = await this.fetchHeroByIdRepository.fetchHeroById(heroId);

    if (!hero) {
      throw new Error();
    }

    //Add hero to favorites
    await this.addFavoriteRepository.addFavorite({
      userId,
      heroId,
    });
  }
}
