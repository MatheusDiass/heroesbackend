import { Hero, IFetchHeroesRepository, Filter } from '../../';
import { InvalidHeroesLimitInFilterError } from '../../errors';

export class FetchHeroesUseCase {
  constructor(private readonly fetchHeroesRepository: IFetchHeroesRepository) {}

  async execute(filter: Filter): Promise<Hero[]> {
    //Check if the startWith has not been provided
    if (!filter.nameStartsWith) {
      filter.nameStartsWith = '';
    }

    //Check if the limit has been provided correctly
    if (filter.limit && (filter.limit > 100 || filter.limit < 1)) {
      throw new InvalidHeroesLimitInFilterError();
    }

    //Check if the limit has not been provided
    if (!filter.limit) {
      filter.limit = 0;
    }

    //Check if the offset has not been provided
    if (!filter.offset) {
      filter.offset = 0;
    }

    //Fetch heroes
    const heroes = await this.fetchHeroesRepository.fetchHeroes(filter);

    return heroes;
  }
}
