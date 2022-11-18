export class IncorrectConfirmationCodeError extends Error {
  constructor() {
    super('Incorrect confirmation code!');
    this.name = 'IncorrectConfirmationCodeError';
  }
}
