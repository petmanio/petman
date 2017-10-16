import { Router } from 'express';
import { indexHandler } from '../../controllers/info/info.controller';

const infoRouter: Router = Router();

infoRouter
  .get('/', indexHandler);

export { infoRouter };
