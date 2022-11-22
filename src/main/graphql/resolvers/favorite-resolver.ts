import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { apolloServerAdapter } from '../../adapters';
import { makeFetchFavoriteByIdController } from '../../favorite/factories/controllers/fetch-favorite-by-id-controller-factory';
import { makeFetchHeroByIdController } from '../../hero/factories/controllers/fetch-hero-by-id-controller-factory';
import { FavoriteModel, HeroModel } from '../models';

@Resolver(() => FavoriteModel)
export class FavoriteResolver {
  @Query(() => FavoriteModel)
  async favoriteById(@Arg('id') id: number): Promise<FavoriteModel> {
    return await apolloServerAdapter(makeFetchFavoriteByIdController(), id);
  }

  @FieldResolver(() => HeroModel)
  async hero(@Root() favorite: FavoriteModel): Promise<HeroModel> {
    return await apolloServerAdapter(
      makeFetchHeroByIdController(),
      favorite.heroId
    );
  }
}
