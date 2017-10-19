import { Router } from 'express';
import { loginHandler, userHandler, loginFbHandler } from '../../controllers/auth/auth.controller';
import { isAuthenticated } from '../../policies/isAuthenticated/isAuthenticated.policy';

const authRouter: Router = Router();

authRouter
  .get('/user', isAuthenticated, userHandler)
  .post('/login', loginHandler)
  .post('/login/fb', loginFbHandler);

export { authRouter };
