export class FavoriteNotFoundError extends Error {
  constructor() {
    super('Favorite not found!');
    this.name = 'FavoriteNotFoundError';
  }
}
