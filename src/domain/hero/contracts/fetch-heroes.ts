import { Hero, Filter } from '../';

export interface IFetchHeroesRepository {
  fetchHeroes(filter: Filter): Promise<Hero[]>;
}
