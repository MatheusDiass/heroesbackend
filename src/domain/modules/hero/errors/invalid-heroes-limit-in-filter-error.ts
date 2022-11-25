export class InvalidHeroesLimitInFilterError extends Error {
  constructor() {
    super('Invalid heroes limit in filter!');
    this.name = 'InvalidHeroesLimitInFilterError';
  }
}
