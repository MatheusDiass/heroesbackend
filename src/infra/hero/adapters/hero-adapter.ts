import { Hero } from '../../../domain/hero';

export abstract class HeroAdapter {
  static fromJson(obj: any): Hero {
    return new Hero({
      id: obj.id,
      name: obj.name,
      description: obj.description,
      image: `${obj.thumbnail.path}.${obj.thumbnail.extension}`,
      stories: obj.stories.items.map((story: any) => ({
        title: story.name,
        link: story.resourceURI,
      })),
      events: obj.events.items.map((event: any) => ({
        title: event.name,
        link: event.resourceURI,
      })),
    });
  }
}
