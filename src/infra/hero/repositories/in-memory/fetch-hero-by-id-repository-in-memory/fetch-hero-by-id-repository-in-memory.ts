import { Hero, IFetchHeroByIdRepository } from '../../../../../domain/hero';
import { database } from '../../../../database-in-memory';
import { HeroAdapter } from '../../../adapters';

export class FetchHeroByIdRepositoryInMemory
  implements IFetchHeroByIdRepository
{
  async fetchHeroById(id: number): Promise<Hero | undefined> {
    const hero = database.heroes.find((hero: any) => hero.id === id);

    if (!hero) {
      return undefined;
    }

    return HeroAdapter.fromJson(hero);
  }
}
