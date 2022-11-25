import { describe, it, expect } from 'vitest';
import { heroData } from './mock-hero';
import { HeroAdapter } from './hero-adapter';

describe('Hero Adapter', () => {
  it('should maps a json to a hero entity', () => {
    const hero = HeroAdapter.fromJson(heroData);

    const stories = heroData.stories.items.map((story) => ({
      title: story.name,
      link: story.resourceURI,
    }));

    const events = heroData.events.items.map((event) => ({
      title: event.name,
      link: event.resourceURI,
    }));

    expect(hero.getId).toEqual(heroData.id);
    expect(hero.getName).toEqual(heroData.name);
    expect(hero.getDescription).toEqual(heroData.description);
    expect(hero.getImage).toEqual(
      `${heroData.thumbnail.path}.${heroData.thumbnail.extension}`
    );
    expect(hero.getStories).toEqual(stories);
    expect(hero.getEvents).toEqual(events);
  });
});
