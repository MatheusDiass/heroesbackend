import { describe, expect, it } from 'vitest';
import { MailValidator } from './mail-validator';

describe('Mail Validator', () => {
  it('should return true if the email is valid', () => {
    const sut = new MailValidator();
    const isValidEmail = sut.validateMail('test@test.com');

    expect(isValidEmail).toEqual(true);
  });

  it('should return false if the email has no username', () => {
    const sut = new MailValidator();
    const isValidEmail = sut.validateMail('@test.com');

    expect(isValidEmail).toEqual(false);
  });

  it('should return false if the email has no symbol "@"', () => {
    const sut = new MailValidator();
    const isValidEmail = sut.validateMail('testtest.com');

    expect(isValidEmail).toEqual(false);
  });

  it('should return false if the email has no domain name', () => {
    const sut = new MailValidator();
    const isValidEmail = sut.validateMail('test@.com');

    expect(isValidEmail).toEqual(false);
  });

  it('should return false if the email has no top-level domain name', () => {
    const sut = new MailValidator();
    const isValidEmail = sut.validateMail('test@test');

    expect(isValidEmail).toEqual(false);
  });
});
