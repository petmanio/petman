import { Router } from 'express';

import { isAuthenticated } from '../../policies/auth/is-authenticated/is-authenticated.policy';
import { loginFbHandler, loginHandler, userHandler } from '../../controllers/auth/auth.controller';

const authRouter: Router = Router();

authRouter
  .get('/user', isAuthenticated, userHandler)
  .post('/login', loginHandler)
  .post('/login/fb', loginFbHandler);

export { authRouter };
