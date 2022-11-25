import { ConfirmRegistrationUseCase } from '../../../../../domain/modules/user';
import {
  ConfirmRegistrationRepositoryInMemory,
  FetchUserByIdRepositoryInMemory,
} from '../../../../../infra/modules/user/implementation';

export const makeConfirmRegistrationUseCase = () => {
  const fetchUserByEmailRepository = new FetchUserByIdRepositoryInMemory();
  const confirmRegistrationRepository =
    new ConfirmRegistrationRepositoryInMemory();

  return new ConfirmRegistrationUseCase(
    fetchUserByEmailRepository,
    confirmRegistrationRepository
  );
};
