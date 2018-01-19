import { Router } from 'express';

import { listHandler, pinsHandler } from '../../controllers/organization/organization.controller';

const organizationRouter: Router = Router();

organizationRouter
  .get('/', listHandler)
  .get('/pins', pinsHandler);

export { organizationRouter };
