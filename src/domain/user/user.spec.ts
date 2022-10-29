import { describe, expect, it } from 'vitest';

//Entity
import { User } from './';

describe('User', () => {
  const userProps = {
    id: 1,
    name: 'Matheus Dias',
    lastName: 'Dias',
    nickname: 'MrDias',
    email: 'dias.math0@gmail.com',
    password: 'matheus@@dias',
    bio: 'Minha Bio',
  };

  it('should be return an error when user name is empty', () => {
    expect(() => {
      new User({
        ...userProps,
        name: '',
      });
    }).toThrow();
  });

  it('should be return an error when user last name is empty', () => {
    expect(() => {
      new User({
        ...userProps,
        lastName: '',
      });
    }).toThrow();
  });

  it('should be return an error when user email is empty', () => {
    expect(() => {
      new User({
        ...userProps,
        email: '',
      });
    }).toThrow();
  });

  it('should be return an error when user password is empty', () => {
    expect(() => {
      new User({
        ...userProps,
        password: '',
      });
    }).toThrow();
  });
});
