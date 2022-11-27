import jwt from 'jsonwebtoken';
import { IToken } from '../../../../../domain/modules/user';

export class Token implements IToken {
  create(data: { [key: string]: string | number }): string {
    return jwt.sign(data, process.env.SECRET!, { expiresIn: '1d' });
  }

  verify(token: string): any {
    return jwt.verify(token, process.env.SECRET!);
  }
}
