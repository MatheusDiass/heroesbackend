import { describe, expect, it } from 'vitest';
import { User } from './user';

describe('User', () => {
  const userProps = {
    id: 1,
    name: 'Test',
    lastname: 'Test',
    nickname: 'MrTest',
    email: 'Test@Test.com',
    password: 'Test@@1',
    bio: 'My bio',
    confirmationCode: 875611,
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
        lastname: '',
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

  it('should return the same id informed in the creation of the user class instance', () => {
    const user = new User(userProps);

    expect(user.getId).toEqual(userProps.id);
  });

  it('should return the same name informed in the creation of the user class instance', () => {
    const user = new User(userProps);

    expect(user.getName).toEqual(userProps.name);
  });

  it('should return the same last name informed in the creation of the user class instance', () => {
    const user = new User(userProps);

    expect(user.getLastName).toEqual(userProps.lastname);
  });

  it('should return the same nickname informed in the creation of the user class instance', () => {
    const user = new User(userProps);

    expect(user.getNickname).toEqual(userProps.nickname);
  });

  it('should return the same email informed in the creation of the user class instance', () => {
    const user = new User(userProps);

    expect(user.getEmail).toEqual(userProps.email);
  });

  it('should return the same password informed in the creation of the user class instance', () => {
    const user = new User(userProps);

    expect(user.getPassword).toEqual(userProps.password);
  });

  it('should return the same bio informed in the creation of the user class instance', () => {
    const user = new User(userProps);

    expect(user.getBio).toEqual(userProps.bio);
  });

  it('should return the same confirmation code informed in the creation of the user class instance', () => {
    const user = new User(userProps);

    expect(user.getConfirmationCode).toEqual(userProps.confirmationCode);
  });

  it('should assign the password in the correct property', () => {
    const password = 'test12345';
    const user = new User(userProps);
    user.setPassword = password;

    expect(user.getPassword).toEqual(password);
  });

  it('should assign the confirmation code in the correct property', () => {
    const confirmationCode = 101010;
    const user = new User(userProps);
    user.setConfirmationCode = confirmationCode;

    expect(user.getConfirmationCode).toEqual(confirmationCode);
  });

  it('should assign the token in the correct property', () => {
    const token = 'token';
    const user = new User(userProps);
    user.setToken = token;

    expect(user.getToken).toEqual(token);
  });
});
