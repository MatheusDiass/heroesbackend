import { Router } from 'express';
import { expressAdapter } from '../../adapters';
import {
  makeLoginUserController,
  makeRegisterUserController,
  makeConfirmRegistrationController,
} from './factories/controllers';

export default (router: Router) => {
  router.post('/login', expressAdapter(makeLoginUserController()));
  router.post('/register', expressAdapter(makeRegisterUserController()));
  router.post(
    '/confirmRegistration',
    expressAdapter(makeConfirmRegistrationController())
  );
};
