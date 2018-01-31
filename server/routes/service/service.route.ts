import { Router } from 'express'
  ;
import { listHandler } from '../../controllers/service/service.controller';

const serviceRouter: Router = Router();

serviceRouter
  .get('/', listHandler);

export { serviceRouter };
