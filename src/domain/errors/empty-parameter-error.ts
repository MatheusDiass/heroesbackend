export class EmptyParameterError extends Error {
  constructor(parameterName: string) {
    super(`Empty Parameter: ${parameterName}`);
    this.name = 'EmptyParameterError';
  }
}
