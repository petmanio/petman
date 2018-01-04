import { NextFunction, Request, Response } from 'express';
import { extend, map } from 'lodash';

import config from '../../config';
import { createService, listService } from '../../services/lost-found/lost-found.service';

const createHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    body.images = map<any>(req.files, file => file.path.replace(config.uploadPath, ''));
    let lostFound: any = await createService(body, req['appSelectedUser']);
    lostFound = lostFound.toJSON();
    lostFound.isOwner = lostFound.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
    res.status(200).json(lostFound);
  } catch (err) {
    next(err);
  }
};

const listHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {offset, limit} = req.query;
    const lostFound = await listService(offset, limit);
    lostFound.list = map(lostFound.list, (lostFound: any) => {
      lostFound = lostFound.toJSON();
      lostFound.isOwner = lostFound.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
      return lostFound;
    });
    res.status(200).json(lostFound);
  } catch (err) {
    next(err);
  }
};

const fetchByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const lostFound = req['appLostFound'].toJSON();
  lostFound.isOwner = lostFound.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
  res.status(200).json(lostFound);
};

const updateByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  req.body.images = typeof req.body.images === 'string' ? [req.body.images] : req.body.images;
  req.body.images = [
    ...map<any>(req.files, file => file.path.replace(config.uploadPath, '')),
    ...map<any>(req.body.images, image => image.replace(/^.*(?=(\/images))/, ''))
  ];
  let lostFound = req['appLostFound'];
  lostFound = extend(lostFound, req.body);
  res.status(200).json(await lostFound.save());
};

const deleteByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const lostFound = req['appLostFound'];
  res.status(200).json(await lostFound.destroy());
};

export { createHandler, listHandler, fetchByIdHandler, updateByIdHandler, deleteByIdHandler };
