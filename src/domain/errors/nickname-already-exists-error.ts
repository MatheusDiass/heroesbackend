export class NicknameAlreadyExistsError extends Error {
  constructor() {
    super('Nickname already exists!');
    this.name = 'NicknameAlreadyExistsError';
  }
}
