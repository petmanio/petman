import * as multer from 'multer';
import { join } from 'path';
import { Router } from 'express';

import config from '../../config';
import { isAuthenticated } from '../../policies/is-authenticated/is-authenticated.policy';
import { createHandler } from '../../controllers/shelter/shelter.controller';

const upload = multer({ dest: join(config.uploadPath, 'images/shelter') });
const shelterRouter: Router = Router();

shelterRouter
  .post('/', isAuthenticated, upload.array('images'), createHandler);

export { shelterRouter };
