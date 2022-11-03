import { describe, expect, it } from 'vitest';
import { Hero } from './hero';

describe('Hero', () => {
  const heroProps = {
    id: 1,
    name: 'Iron Man',
    description: 'He is a superhero',
    image: 'ironman.jpeg',
    stories: [
      {
        title: 'Superhero 1',
        link: 'www.superhero1.com',
      },
      {
        title: 'Superhero 2',
        link: 'www.superhero2.com',
      },
    ],
    events: [
      {
        title: 'Event 1',
        link: 'www.event1.com',
      },
      {
        title: 'Event 2',
        link: 'www.event2.com',
      },
    ],
  };

  it('should return an error when hero name is empty', () => {
    expect(() => {
      new Hero({
        ...heroProps,
        name: '',
      });
    }).toThrow();
  });

  it('should return the same stories informed in the creation of the hero class instance', () => {
    const user = new Hero(heroProps);

    expect(user.getStories).toEqual(heroProps.stories);
  });

  it('should return the same events informed in the creation of the hero class instance', () => {
    const user = new Hero(heroProps);

    expect(user.getEvents).toEqual(heroProps.events);
  });

  it('should return an empty array if no stories exist', () => {
    const user = new Hero({
      ...heroProps,
      stories: undefined,
    });

    expect(user.getStories).toEqual([]);
  });

  it('should return an empty array if no events exist', () => {
    const user = new Hero({
      ...heroProps,
      events: undefined,
    });

    expect(user.getEvents).toEqual([]);
  });
});
