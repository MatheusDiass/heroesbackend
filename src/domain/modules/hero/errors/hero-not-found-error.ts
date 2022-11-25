export class HeroNotFoundError extends Error {
  constructor() {
    super('Hero not found!');
    this.name = 'HeroNotFoundError';
  }
}
