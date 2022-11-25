import { IMailValidator } from '../../../../../domain/modules/user';

export class MailValidator implements IMailValidator {
  //Example of valid emails: test@test.com / test@test.com.br
  validateMail(email: string): boolean {
    const regExp =
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regExp.test(email);
  }
}
