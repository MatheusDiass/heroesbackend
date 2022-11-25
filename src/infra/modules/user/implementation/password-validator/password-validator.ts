import { IPasswordValidator } from '../../../../../domain/modules/user';

export class PasswordValidator implements IPasswordValidator {
  /* The password must have at least one uppercase letter, one lowercase letter,
  one number, one symbol and eight characters */
  validatePassword(password: string): boolean {
    const regExp =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    return regExp.test(password);
  }
}
