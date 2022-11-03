import { Hero } from '../entities/hero';

export interface IFetchHeroByIdRepository {
  fetchHeroById(id: number): Promise<Hero>;
}
