import { describe, expect, it } from 'vitest';
import { User } from './user';

describe('User', () => {
  const userProps = {
    id: 1,
    name: 'Test',
    lastName: 'Test',
    nickname: 'MrTest',
    email: 'Test@Test.com',
    password: 'Test@@1',
    bio: 'My bio',
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

  it('should return an error when user password is empty', () => {
    expect(() => {
      new User({
        ...userProps,
        password: '',
      });
    }).toThrow();
  });

  it('should return the same password informed in the creation of the user class instance', () => {
    const user = new User(userProps);

    expect(user.getPassword).toEqual(userProps.password);
  });

  it('should return the same password informed in the creation of the user class instance', () => {
    const user = new User(userProps);

    expect(user.getPassword).toEqual(userProps.password);
  });

  it('should assign the password in the correct property', () => {
    const password = 'test12345';
    const user = new User(userProps);
    user.setPassword = password;

    expect(user.getPassword).toEqual(password);
  });
});
