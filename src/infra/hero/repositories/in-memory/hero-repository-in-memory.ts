import {
  IFetchHeroesRepository,
  IFetchHeroByIdRepository,
  Filter,
  Hero,
} from '../../../../domain/hero';
import { HeroAdapter } from '../../adapters';
import { heroesData } from './heroes-mock';

export class HeroRepositoryInMemory
  implements IFetchHeroesRepository, IFetchHeroByIdRepository
{
  async fetchHeroes(filter: Filter): Promise<Hero[]> {
    let heroes: any[] = [];
    const nameStartsWith: string = filter.nameStartsWith || '';
    const limit: number = filter.limit || 0;
    const offset: number = filter.offset || 0;

    //Fetch heroes from a offset
    heroes = heroesData.slice(offset);

    //Filter heroes by name that starts with
    heroes = heroes.filter((hero) => hero.name.startsWith(nameStartsWith));

    //Add a limit of returned heroes
    if (limit) {
      heroes = heroes.slice(0, limit);
    }

    return heroes.map((hero) => HeroAdapter.fromJson(hero));
  }

  async fetchHeroById(id: number): Promise<Hero | undefined> {
    const hero = heroesData.find((hero) => hero.id === id);

    if (!hero) {
      return undefined;
    }

    return HeroAdapter.fromJson(hero);
  }
}
