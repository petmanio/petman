import * as multer from 'multer';
import { join } from 'path';
import { Router } from 'express';

import config from '../../config';
import { isAuthenticated } from '../../policies/auth/is-authenticated/is-authenticated.policy';
import { exists } from '../../policies/shelter/exists/exists.policy';
import { isOwner } from '../../policies/shelter/is-owner/is-owner.policy';
import {
  createHandler,
  deleteByIdHandler,
  fetchByIdHandler,
  listHandler,
  updateByIdHandler
} from '../../controllers/shelter/shelter.controller';

const upload = multer({ dest: join(config.uploadPath, 'images/shelters') });
const shelterRouter: Router = Router();

shelterRouter
  .get('/', listHandler)
  .get('/:id', exists, fetchByIdHandler)
  .put('/:id', isAuthenticated, exists, isOwner, upload.array('images'), updateByIdHandler)
  .delete('/:id', isAuthenticated, exists, isOwner, deleteByIdHandler)
  .post('/', isAuthenticated, upload.array('images'), createHandler);

export { shelterRouter };
