import { Router } from 'express';
import { expressAdapter } from '../../adapters';
import { makeLoginUserController } from './factories/controllers';

export default (router: Router) => {
  router.post('/login', expressAdapter(makeLoginUserController()));
};
