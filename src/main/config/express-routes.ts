import { Request, Response, Router } from 'express';

//User Routes
import createUserRoutes from '../user/routes';

export const createRoutes = (router: Router) => {
  router.get('/', (req: Request, res: Response) => {
    // eslint-disable-next-line no-console
    res.send('🚀 heroesbackend server is running!');
  });

  createUserRoutes(router);
};
