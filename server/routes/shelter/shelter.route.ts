import { Router } from 'express';

import { isAuthenticated } from '../../policies/is-authenticated/is-authenticated.policy';
import { createHandler } from '../../controllers/shelter/shelter.controller';

const shelterRouter: Router = Router();

shelterRouter
  .post('/', isAuthenticated, createHandler);

export { shelterRouter };
