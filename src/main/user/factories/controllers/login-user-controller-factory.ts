import { LoginUserController } from '../../../../presentation/user/controllers/login-user-controller';
import { makeLoginUserUseCase } from '../use-cases';

export const makeLoginUserController = () => {
  return new LoginUserController(makeLoginUserUseCase());
};
