import * as multer from 'multer';
import { join } from 'path';
import { Router } from 'express';

import config from '../../config';
import { isAuthenticated } from '../../policies/is-authenticated/is-authenticated.policy';
import { shelterExists } from '../../policies/shelter-exists/shelter-exists.policy';
import { isShelterOwner } from '../../policies/is-shelter-owner/is-shelter-owner.policy';
import {
  createHandler, deleteByIdHandler, fetchByIdHandler, listHandler,
  updateByIdHandler
} from '../../controllers/shelter/shelter.controller';

const upload = multer({ dest: join(config.uploadPath, 'images/shelter') });
const shelterRouter: Router = Router();

shelterRouter
  .get('/', listHandler)
  .get('/:id', shelterExists, fetchByIdHandler)
  .put('/:id', isAuthenticated, shelterExists, isShelterOwner, upload.array('images'), updateByIdHandler)
  .delete('/:id', isAuthenticated, shelterExists, isShelterOwner, deleteByIdHandler)
  .post('/', isAuthenticated, upload.array('images'), createHandler);

export { shelterRouter };
