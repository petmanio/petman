import * as multer from 'multer';
import { join } from 'path';
import { Router } from 'express';

import config from '../../config';
import { isAuthenticated } from '../../policies/is-authenticated/is-authenticated.policy';
import { shelterExists } from '../../policies/shelter-exists/shelter-exists.policy';
import { isShelterOwner } from '../../policies/is-shelter-owner/is-shelter-owner.policy';
import { byIdHandler, createHandler, listHandler, updateHandler } from '../../controllers/shelter/shelter.controller';

const upload = multer({ dest: join(config.uploadPath, 'images/shelter') });
const shelterRouter: Router = Router();

shelterRouter
  .get('/', listHandler)
  .get('/:id', shelterExists, byIdHandler)
  .put('/:id', isAuthenticated, shelterExists, isShelterOwner, upload.array('images'), updateHandler)
  .post('/', isAuthenticated, upload.array('images'), createHandler);

export { shelterRouter };
