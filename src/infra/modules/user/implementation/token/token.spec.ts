import { describe, expect, it } from 'vitest';
import { IToken } from '../../../../../domain/modules/user';
import jwt from 'jsonwebtoken';

class Token implements IToken {
  create(data: { [key: string]: string | number }): string {
    return jwt.sign(data, 'mykey', { expiresIn: '1d' });
  }

  verify(token: string): any {
    return jwt.verify(token, 'mykey');
  }
}

describe('Token', () => {
  it('should generate and verify the token', () => {
    const data = {
      id: 1,
      name: 'Test',
      lastname: 'Test',
      nickname: 'Test01',
      email: 'test1@test.com',
    };
    const sut = new Token();

    const token = sut.create(data);
    const dataFromToken = sut.verify(token);

    delete dataFromToken?.exp;
    delete dataFromToken?.iat;

    expect(token).toBeTypeOf('string');
    expect(data).toEqual(dataFromToken);
  });
});
