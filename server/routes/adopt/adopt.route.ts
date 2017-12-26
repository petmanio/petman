import * as multer from 'multer';
import { join } from 'path';
import { Router } from 'express';

import config from '../../config';
import { isAuthenticated } from '../../policies/is-authenticated/is-authenticated.policy';
import { adoptExists } from '../../policies/adopt-exists/adopt-exists.policy';
import { isAdoptOwner } from '../../policies/is-adopt-owner/is-adopt-owner.policy';
import {
  createHandler, deleteByIdHandler, fetchByIdHandler, listHandler,
  updateByIdHandler
} from '../../controllers/adopt/adopt.controller';

const upload = multer({ dest: join(config.uploadPath, 'images/adoption') });
const adoptRouter: Router = Router();

adoptRouter
  .get('/', listHandler)
  .get('/:id', adoptExists, fetchByIdHandler)
  .put('/:id', isAuthenticated, adoptExists, isAdoptOwner, upload.array('images'), updateByIdHandler)
  .delete('/:id', isAuthenticated, adoptExists, isAdoptOwner, deleteByIdHandler)
  .post('/', isAuthenticated, upload.array('images'), createHandler);

export { adoptRouter };
