import { User } from '../entities/user';

export type UserRegistration = {
  user: User;
  password: string;
};
