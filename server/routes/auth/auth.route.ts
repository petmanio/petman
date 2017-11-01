import { Router } from 'express';
import { loginFbHandler, loginHandler, userHandler } from '../../controllers/auth/auth.controller';
import { isAuthenticated } from '../../policies/isAuthenticated/isAuthenticated.policy';

const authRouter: Router = Router();

authRouter
  .get('/user', isAuthenticated, userHandler)
  .post('/login', loginHandler)
  .post('/login/fb', loginFbHandler);

export { authRouter };
