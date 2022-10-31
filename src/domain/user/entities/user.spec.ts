import { describe, expect, it } from 'vitest';

//Entity
import { User } from '../';

describe('User', () => {
  const userProps = {
    id: 1,
    name: 'Matheus Dias',
    lastName: 'Dias',
    nickname: 'MrDias',
    email: 'test@test.com',
    bio: 'Minha Bio',
  };

  it('should return an error when user name is empty', () => {
    expect(() => {
      new User({
        ...userProps,
        name: '',
      });
    }).toThrow();
  });

  it('should return an error when user last name is empty', () => {
    expect(() => {
      new User({
        ...userProps,
        lastName: '',
      });
    }).toThrow();
  });

  it('should return an error when user email is empty', () => {
    expect(() => {
      new User({
        ...userProps,
        email: '',
      });
    }).toThrow();
  });
});
