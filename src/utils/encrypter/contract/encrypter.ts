export interface IEncrypter {
  createHash(text: string): Promise<string>;
  compareHash(text: string, hash: string): Promise<boolean>;
}
