import { Resolver, Query, Arg } from 'type-graphql';
import { HeroModel } from '../models/hero-model';
import { HeroFilterInput } from '../inputs';
import { apolloServerAdapter } from '../../adapters';
import { makeFetchHeroesController } from '../../hero/factories/controllers';

@Resolver()
export class HeroResolver {
  @Query(() => [HeroModel])
  async heroes(
    @Arg('filter', { nullable: true }) filter: HeroFilterInput
  ): Promise<HeroModel[]> {
    const heroes = await apolloServerAdapter(
      makeFetchHeroesController(),
      filter
    );

    return heroes;
  }
}
