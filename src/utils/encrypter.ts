export interface IEncrypter {
  createHash(text: string): string;
  compareHash(hash1: string, hash2: string): boolean;
}
