import { NextFunction, Request, Response } from 'express';
import { extend, map } from 'lodash';

import config from '../../config';
import { createService, listService } from '../../services/walker/walker.service';

const createHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    let walker: any = await createService(body, req['appSelectedUser']);
    walker = walker.toJSON();
    walker.isOwner = walker.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
    res.status(200).json(walker);
  } catch (err) {
    next(err);
  }
};

const listHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {offset, limit} = req.query;
    const walkers = await listService(offset, limit);
    walkers.list = map(walkers.list, (walker: any) => {
      walker = walker.toJSON();
      walker.isOwner = walker.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
      return walker;
    });
    res.status(200).json(walkers);
  } catch (err) {
    next(err);
  }
};

const fetchByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const walker = req['appWalker'].toJSON();
  walker.isOwner = walker.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
  res.status(200).json(walker);
};

const updateByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  let walker = req['appWalker'];
  walker = extend(walker, req.body);
  res.status(200).json(await walker.save());
};

const deleteByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const walker = req['appWalker'];
  res.status(200).json(await walker.destroy());
};

export { createHandler, listHandler, fetchByIdHandler, updateByIdHandler, deleteByIdHandler };
