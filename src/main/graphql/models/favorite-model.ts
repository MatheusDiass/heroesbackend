import { ObjectType, Field } from 'type-graphql';
import { HeroModel } from './hero-model';

@ObjectType()
export class FavoriteModel {
  @Field(() => String)
  private readonly id: string;

  @Field(() => String)
  private readonly userId: string;

  @Field(() => String)
  public readonly heroId: string;

  @Field(() => HeroModel)
  private readonly hero: HeroModel;
}
