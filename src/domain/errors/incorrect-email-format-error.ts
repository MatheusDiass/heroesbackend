export class IncorrectEmailFormatError extends Error {
  constructor() {
    super('Email with the incorrect format!');
    this.name = 'IncorrectEmailFormatError';
  }
}
