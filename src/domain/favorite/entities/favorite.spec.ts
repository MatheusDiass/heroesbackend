import { describe, expect, it } from 'vitest';
import { Favorite } from './favorite';

describe('Favorite Entity', () => {
  it('should throw an error if it has id and doesnt have a hero in favorite', () => {
    expect(() => {
      new Favorite({
        id: 1,
        name: 'New Favorite',
      });
    }).toThrow();
  });
});
