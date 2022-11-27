export class UnconfirmedRegistrationError extends Error {
  constructor() {
    super('Unconfirmed registration!');
    this.name = 'UnconfirmedRegistrationError';
  }
}
