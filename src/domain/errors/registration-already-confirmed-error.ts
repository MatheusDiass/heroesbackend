export class RegistrationAlreadyConfirmedError extends Error {
  constructor() {
    super('Registration Already Confirmed!');
    this.name = 'RegistrationAlreadyConfirmedError';
  }
}
