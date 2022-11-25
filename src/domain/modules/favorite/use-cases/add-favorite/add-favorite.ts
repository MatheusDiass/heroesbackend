import { AddFavoriteInput, IAddFavoriteRepository } from '../..';
import { IFetchHeroByIdRepository } from '../../../hero';
import { IFetchUserByIdRepository } from '../../../user';
import { MissingParameterError, UserNotFoundError } from '../../../../errors';
import { HeroNotFoundError } from '../../../hero/errors';

export class AddFavoriteUseCase {
  constructor(
    private readonly fetchUserByIdRepository: IFetchUserByIdRepository,
    private readonly fetchHeroByIdRepository: IFetchHeroByIdRepository,
    private readonly addFavoriteRepository: IAddFavoriteRepository
  ) {}

  async execute({ userId, heroId }: AddFavoriteInput): Promise<void> {
    //Check if the user id has not been provided
    if (!userId) {
      throw new MissingParameterError('userId');
    }

    //Check if the user does not exist
    const user = await this.fetchUserByIdRepository.fetchUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    //Check if the hero id has not been provided
    if (!heroId) {
      throw new MissingParameterError('heroId');
    }

    //Check if the hero does not exist
    const hero = await this.fetchHeroByIdRepository.fetchHeroById(heroId);

    if (!hero) {
      throw new HeroNotFoundError();
    }

    //Add hero to favorites
    await this.addFavoriteRepository.addFavorite({
      userId,
      heroId,
    });
  }
}
