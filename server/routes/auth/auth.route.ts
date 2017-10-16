import { Router } from 'express';
import { loginHandler, userHandler } from '../../controllers/auth/auth.controller';
import { isAuthenticated } from '../../policies/isAuthenticated/isAuthenticated.policy';

const authRouter: Router = Router();

authRouter
  .post('/login', loginHandler)
  .get('/user', isAuthenticated, userHandler);

export { authRouter };
