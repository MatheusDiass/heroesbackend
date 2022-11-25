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
} from '../../modules/favorite/factories/controllers';
import { makeFetchFavoriteByIdController } from '../../modules/favorite/factories/controllers';
import { makeFetchHeroByIdController } from '../../modules/hero/factories/controllers';
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
