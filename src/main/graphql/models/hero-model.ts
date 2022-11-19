import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'The Story Model' })
class StoryModel {
  @Field(() => String)
  private readonly title: string;

  @Field(() => String)
  private readonly link: string;
}

@ObjectType({ description: 'The Event Model' })
class EventModel {
  @Field(() => String)
  private readonly title: string;

  @Field(() => String)
  private readonly link: string;
}

@ObjectType({ description: 'The Hero Model' })
export class HeroModel {
  @Field(() => ID)
  private readonly id: string;

  @Field(() => String)
  private readonly name: string;

  @Field(() => String)
  private readonly description: string;

  @Field(() => String)
  private readonly image: string;

  @Field(() => [StoryModel])
  private readonly stories: StoryModel[];

  @Field(() => [EventModel])
  private readonly events: EventModel[];
}
