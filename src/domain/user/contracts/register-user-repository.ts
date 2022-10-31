import { UserRegistration } from '../';

export interface IRegisterUserRepository {
  registerUser({ user, password }: UserRegistration): Promise<void>;
}
