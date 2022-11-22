import { Field, ID, InputType } from 'type-graphql';

@InputType({ description: 'Add Favorite Input' })
export class AddFavoriteInput {
  @Field(() => ID)
  private userId: number;

  @Field(() => ID)
  private heroId: number;
}
