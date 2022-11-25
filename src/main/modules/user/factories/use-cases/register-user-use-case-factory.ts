import { RegisterUserUseCase } from '../../../../../domain/modules/user';
import {
  FetchUserByNicknameRepositoryInMemory,
  MailValidator,
  PasswordValidator,
  RegisterUserRepositoryInMemory,
} from '../../../../../infra/modules/user/implementation';
import { CodeGenerator, Encrypter, MailProvider } from '../../../../../utils';

export const makeRegisterUserUseCase = () => {
  const mailValidator = new MailValidator();
  const passwordValidator = new PasswordValidator();
  const encrypter = new Encrypter();
  const fetchUserByNicknameRepository =
    new FetchUserByNicknameRepositoryInMemory();
  const registerUserRepository = new RegisterUserRepositoryInMemory();
  const mailProvider = new MailProvider();
  const codeGenerator = new CodeGenerator();

  return new RegisterUserUseCase(
    mailValidator,
    passwordValidator,
    encrypter,
    fetchUserByNicknameRepository,
    registerUserRepository,
    mailProvider,
    codeGenerator
  );
};
