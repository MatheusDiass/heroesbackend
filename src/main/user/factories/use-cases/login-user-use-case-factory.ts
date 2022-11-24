import { LoginUserUseCase } from '../../../../domain/user';
import { MailValidator } from '../../../../infra/user/implementation/mail-validator/mail-validator';
import { PasswordValidator } from '../../../../infra/user/implementation/password-validator/password-validator';
import { FetchUserByEmailRepositoryInMemory } from '../../../../infra/user/implementation/repositories/in-memory';
import { Encrypter } from '../../../../utils/encrypter';

export const makeLoginUserUseCase = () => {
  const mailValidator = new MailValidator();
  const passwordValidator = new PasswordValidator();
  const encrypter = new Encrypter();
  const findUserByEmailRepository = new FetchUserByEmailRepositoryInMemory();

  return new LoginUserUseCase(
    mailValidator,
    passwordValidator,
    encrypter,
    findUserByEmailRepository
  );
};
