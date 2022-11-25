import { RegisterUserController } from '../../../../../presentation/modules/user/controllers';
import { makeRegisterUserUseCase } from '../use-cases';

export const makeRegisterUserController = () => {
  return new RegisterUserController(makeRegisterUserUseCase());
};
