import {
  Filter,
  Hero,
  IFetchHeroesRepository,
} from '../../../../../../domain/modules/hero';
import { database } from '../../../../../database-in-memory';
import { HeroAdapter } from '../../../adapters';

export class FetchHeroesRepositoryInMemory implements IFetchHeroesRepository {
  async fetchHeroes(filter: Filter): Promise<Hero[]> {
    let heroes: any[] = [];
    const nameStartsWith: string = filter.nameStartsWith || '';
    const limit: number = filter.limit || 0;
    const offset: number = filter.offset || 0;

    //Fetch heroes from a offset
    heroes = database.heroes.slice(offset);

    //Filter heroes by name that starts with
    heroes = heroes.filter((hero) => hero.name.startsWith(nameStartsWith));

    //Add a limit of returned heroes
    if (limit) {
      heroes = heroes.slice(0, limit);
    }

    return heroes.map((hero) => HeroAdapter.fromJson(hero));
  }
}
