export class RegistrationAlreadyConfirmedError extends Error {
  constructor() {
    super('Registration already confirmed!');
    this.name = 'RegistrationAlreadyConfirmedError';
  }
}
