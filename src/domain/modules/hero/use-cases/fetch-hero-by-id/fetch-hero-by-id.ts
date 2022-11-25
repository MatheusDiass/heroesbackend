import { Hero, IFetchHeroByIdRepository } from '../../';
import { MissingParameterError } from '../../../../errors';
import { HeroNotFoundError } from '../../errors';

export class FetchHeroByIdUseCase {
  constructor(
    private readonly fetchHeroByIdRepository: IFetchHeroByIdRepository
  ) {}

  async execute(id: number): Promise<Hero> {
    if (!id) {
      throw new MissingParameterError('id');
    }

    const hero = await this.fetchHeroByIdRepository.fetchHeroById(id);

    if (!hero) {
      throw new HeroNotFoundError();
    }

    return hero;
  }
}
