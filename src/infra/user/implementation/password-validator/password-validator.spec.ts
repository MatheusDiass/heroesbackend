import { describe, expect, it } from 'vitest';
import { PasswordValidator } from './password-validator';

describe('Password Validator', () => {
  it('should return true if the password is valid', () => {
    const sut = new PasswordValidator();
    const isValidPassword = sut.validatePassword('Test@1999');

    expect(isValidPassword).toEqual(true);
  });

  it('should return false if the password does not have an uppercase letter', () => {
    const sut = new PasswordValidator();
    const isValidPassword = sut.validatePassword('test@1999');

    expect(isValidPassword).toEqual(false);
  });

  it('should return false if the password does not have a lowercase letter', () => {
    const sut = new PasswordValidator();
    const isValidPassword = sut.validatePassword('TEST@1999');

    expect(isValidPassword).toEqual(false);
  });

  it('should return false if the password does not have a number', () => {
    const sut = new PasswordValidator();
    const isValidPassword = sut.validatePassword('Test@test');

    expect(isValidPassword).toEqual(false);
  });

  it('should return false if the password is not eight characters long', () => {
    const sut = new PasswordValidator();
    const isValidPassword = sut.validatePassword('Test@19');

    expect(isValidPassword).toEqual(false);
  });
});
