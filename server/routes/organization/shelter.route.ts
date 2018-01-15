import { Router } from 'express';

import { listHandler } from '../../controllers/organization/organization.controller';

const organizationRouter: Router = Router();

organizationRouter
  .get('/', listHandler);

export { organizationRouter };
