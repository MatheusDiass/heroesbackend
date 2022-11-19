import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Hero Filter Input' })
export class HeroFilterInput {
  @Field({ nullable: true })
  private nameStartsWith?: string;

  @Field({ nullable: true })
  private limit?: number;

  @Field({ nullable: true })
  private offset?: number;
}
