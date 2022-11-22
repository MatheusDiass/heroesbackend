import {
  Resolver,
  Query,
  Arg,
  FieldResolver,
  Root,
  Mutation,
} from 'type-graphql';
import { apolloServerAdapter } from '../../adapters';
import {
  makeAddFavoriteController,
  makeRemoveFavoriteController,
} from '../../favorite/factories/controllers';
import { makeFetchFavoriteByIdController } from '../../favorite/factories/controllers/fetch-favorite-by-id-controller-factory';
import { makeFetchHeroByIdController } from '../../hero/factories/controllers/fetch-hero-by-id-controller-factory';
import { AddFavoriteInput } from '../inputs';
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

  @Mutation(() => Boolean)
  async addFavorite(
    @Arg('AddFavoriteInput') addFavoriteInput: AddFavoriteInput
  ): Promise<boolean> {
    return apolloServerAdapter(makeAddFavoriteController(), addFavoriteInput);
  }

  @Mutation(() => Boolean)
  async removeFavorite(@Arg('id') id: number): Promise<boolean> {
    return apolloServerAdapter(makeRemoveFavoriteController(), id);
  }
}
