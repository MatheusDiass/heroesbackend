import { Hero, IFetchHeroByIdRepository } from '../../';

export class FetchHeroByIdUseCase {
  constructor(
    private readonly fetchHeroByIdRepository: IFetchHeroByIdRepository
  ) {}

  async execute(id: number): Promise<Hero> {
    if (!id) {
      throw new Error();
    }

    const hero = await this.fetchHeroByIdRepository.fetchHeroById(id);

    return hero;
  }
}
