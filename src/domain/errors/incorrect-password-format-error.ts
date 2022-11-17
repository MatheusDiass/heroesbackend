export class IncorrectPasswordFormatError extends Error {
  constructor() {
    super('Password with the incorrect format!');
    this.name = 'IncorrectPasswordFormatError';
  }
}
