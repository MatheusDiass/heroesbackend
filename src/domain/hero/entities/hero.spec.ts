import { describe, expect, it } from 'vitest';
import { Hero } from './hero';

describe('Hero', () => {
  const heroProps = {
    id: 1,
    name: 'Iron Man',
  };

  it('should return an error when hero name is empty', () => {
    expect(() => {
      new Hero({
        ...heroProps,
        name: '',
      });
    }).toThrow();
  });
});
