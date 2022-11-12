import { IEncrypter } from './contract/encrypter';
import bcrypt from 'bcrypt';

export class Encrypter implements IEncrypter {
  async createHash(text: string): Promise<string> {
    return await bcrypt.hash(text, 10);
  }

  async compareHash(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
}
