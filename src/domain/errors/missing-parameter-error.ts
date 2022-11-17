export class MissingParameterError extends Error {
  constructor(parameterName: string) {
    super(`Missing Parameter: ${parameterName}`);
    this.name = 'MissingParameterError';
  }
}
