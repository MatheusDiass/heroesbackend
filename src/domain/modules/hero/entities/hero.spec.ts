import { describe, expect, it } from 'vitest';
import { EmptyParameterError } from '../../../errors';
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

  it('should throw EmptyParameterError type error if hero name is empty', () => {
    expect(() => {
      new Hero({
        ...heroProps,
        name: '',
      });
    }).toThrow(EmptyParameterError);
  });

  it('should return the same stories informed in the creation of the hero class instance', () => {
    const hero = new Hero(heroProps);

    expect(hero.getStories).toEqual(heroProps.stories);
  });

  it('should return the same id informed in the creation of the hero class instance', () => {
    const hero = new Hero(heroProps);

    expect(hero.getId).toEqual(heroProps.id);
  });

  it('should return the same name informed in the creation of the hero class instance', () => {
    const hero = new Hero(heroProps);

    expect(hero.getName).toEqual(heroProps.name);
  });

  it('should return the same description informed in the creation of the hero class instance', () => {
    const hero = new Hero(heroProps);

    expect(hero.getDescription).toEqual(heroProps.description);
  });

  it('should return the same image name informed in the creation of the hero class instance', () => {
    const hero = new Hero(heroProps);

    expect(hero.getImage).toEqual(heroProps.image);
  });

  it('should return the same events informed in the creation of the hero class instance', () => {
    const hero = new Hero(heroProps);

    expect(hero.getEvents).toEqual(heroProps.events);
  });

  it('should return an empty array if no stories exist', () => {
    const hero = new Hero({
      ...heroProps,
      stories: undefined,
    });

    expect(hero.getStories).toEqual([]);
  });

  it('should return an empty array if no events exist', () => {
    const hero = new Hero({
      ...heroProps,
      events: undefined,
    });

    expect(hero.getEvents).toEqual([]);
  });
});
