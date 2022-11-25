import { ConfirmRegistrationController } from '../../../../../presentation/modules/user/controllers';
import { makeConfirmRegistrationUseCase } from '../use-cases';

export const makeConfirmRegistrationController = () => {
  return new ConfirmRegistrationController(makeConfirmRegistrationUseCase());
};
