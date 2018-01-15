import { Router } from 'express';

import { isAuthenticated } from '../../policies/auth/is-authenticated/is-authenticated.policy';
import { exists } from '../../policies/walker/exists/exists.policy';
import { isOwner } from '../../policies/walker/is-owner/is-owner.policy';
import {
  createHandler, deleteByIdHandler, fetchByIdHandler, listHandler,
  updateByIdHandler
} from '../../controllers/walker/walker.controller';

const walkerRouter: Router = Router();

walkerRouter
  .get('/', listHandler)
  .get('/:id', exists, fetchByIdHandler)
  .put('/:id', isAuthenticated, exists, isOwner, updateByIdHandler)
  .delete('/:id', isAuthenticated, exists, isOwner, deleteByIdHandler)
  .post('/', isAuthenticated, createHandler);

export { walkerRouter };
