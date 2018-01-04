import * as multer from 'multer';
import { join } from 'path';
import { Router } from 'express';

import config from '../../config';
import { isAuthenticated } from '../../policies/is-authenticated/is-authenticated.policy';
import { lostFoundExists } from '../../policies/lost-found-exists/lost-found-exists.policy';
import { isLostFoundOwner } from '../../policies/is-lost-found-owner/is-lost-found-owner.policy';
import {
  createHandler, deleteByIdHandler, fetchByIdHandler, listHandler,
  updateByIdHandler
} from '../../controllers/lost-found/lost-found.controller';

const upload = multer({ dest: join(config.uploadPath, 'images/lost-found') });
const lostFoundRouter: Router = Router();

lostFoundRouter
  .get('/', listHandler)
  .get('/:id', lostFoundExists, fetchByIdHandler)
  .put('/:id', isAuthenticated, lostFoundExists, isLostFoundOwner, upload.array('images'), updateByIdHandler)
  .delete('/:id', isAuthenticated, lostFoundExists, isLostFoundOwner, deleteByIdHandler)
  .post('/', isAuthenticated, upload.array('images'), createHandler);

export { lostFoundRouter };
