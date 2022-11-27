import { LoginUserUseCase } from '../../../../../domain/modules/user';
import {
  MailValidator,
  PasswordValidator,
  Token,
} from '../../../../../infra/modules/user/implementation';
import { FetchUserByEmailRepositoryInMemory } from '../../../../../infra/modules/user/implementation/repositories/in-memory';
import { Encrypter } from '../../../../../utils/encrypter';

export const makeLoginUserUseCase = () => {
  const mailValidator = new MailValidator();
  const passwordValidator = new PasswordValidator();
  const encrypter = new Encrypter();
  const findUserByEmailRepository = new FetchUserByEmailRepositoryInMemory();
  const token = new Token();

  return new LoginUserUseCase(
    mailValidator,
    passwordValidator,
    encrypter,
    findUserByEmailRepository,
    token
  );
};
