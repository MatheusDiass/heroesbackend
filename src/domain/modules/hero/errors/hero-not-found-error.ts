export class HeroNotFoundError extends Error {
  constructor() {
    super('Hero nor found!');
    this.name = 'HeroNotFoundError';
  }
}
