import { Router } from 'express';
import { expressAdapter } from '../../adapters';
import {
  makeLoginUserController,
  makeRegisterUserController,
} from './factories/controllers';

export default (router: Router) => {
  router.post('/login', expressAdapter(makeLoginUserController()));
  router.post('/register', expressAdapter(makeRegisterUserController()));
};
