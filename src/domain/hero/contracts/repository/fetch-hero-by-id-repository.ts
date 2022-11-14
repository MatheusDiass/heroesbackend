import { Hero } from '../../';

export interface IFetchHeroByIdRepository {
  fetchHeroById(id: number): Promise<Hero | undefined>;
}
