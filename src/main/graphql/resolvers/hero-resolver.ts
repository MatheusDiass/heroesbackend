import { Resolver, Query, Arg } from 'type-graphql';
import { HeroModel } from '../models/hero-model';
import { HeroFilterInput } from '../inputs';
import { apolloServerAdapter } from '../../adapters';
import { makeFetchHeroesController } from '../../modules/hero/factories/controllers';
import { makeFetchHeroByIdController } from '../../modules/hero/factories/controllers/fetch-hero-by-id-controller-factory';

@Resolver()
export class HeroResolver {
  @Query(() => [HeroModel])
  async heroes(
    @Arg('filter', { nullable: true }) filter: HeroFilterInput
  ): Promise<HeroModel[]> {
    return await apolloServerAdapter(makeFetchHeroesController(), filter);
  }

  @Query(() => HeroModel)
  async hero(@Arg('id') id: number): Promise<HeroModel> {
    return await apolloServerAdapter(makeFetchHeroByIdController(), id);
  }
}
