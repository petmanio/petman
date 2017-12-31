import * as multer from 'multer';
import { join } from 'path';
import { Router } from 'express';

import config from '../../config';
import { isAuthenticated } from '../../policies/is-authenticated/is-authenticated.policy';
import { walkerExists } from '../../policies/walker-exists/walker-exists.policy';
import { isWalkerOwner } from '../../policies/is-walker-owner/is-walker-owner.policy';
import {
  createHandler, deleteByIdHandler, fetchByIdHandler, listHandler,
  updateByIdHandler
} from '../../controllers/walker/walker.controller';

const upload = multer({ dest: join(config.uploadPath, 'images/walkers') });
const walkerRouter: Router = Router();

walkerRouter
  .get('/', listHandler)
  .get('/:id', walkerExists, fetchByIdHandler)
  .put('/:id', isAuthenticated, walkerExists, isWalkerOwner, upload.array('images'), updateByIdHandler)
  .delete('/:id', isAuthenticated, walkerExists, isWalkerOwner, deleteByIdHandler)
  .post('/', isAuthenticated, upload.array('images'), createHandler);

export { walkerRouter };
