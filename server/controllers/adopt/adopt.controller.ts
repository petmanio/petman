import { NextFunction, Request, Response } from 'express';
import { extend, map } from 'lodash';

import config from '../../config';
import { createService, listService } from '../../services/adopt/adopt.service';

const createHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    body.images = map<any>(req.files, file => file.path.replace(config.uploadPath, ''));
    let adopt: any = await createService(body, req['appSelectedUser']);
    adopt = adopt.toJSON();
    adopt.isOwner = adopt.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
    res.status(200).json(adopt);
  } catch (err) {
    next(err);
  }
};

const listHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {offset, limit} = req.query;
    const adoption = await listService(offset, limit);
    adoption.list = map(adoption.list, (adopt: any) => {
      adopt = adopt.toJSON();
      adopt.isOwner = adopt.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
      return adopt;
    });
    res.status(200).json(adoption);
  } catch (err) {
    next(err);
  }
};

const fetchByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const adopt = req['appAdopt'].toJSON();
  adopt.isOwner = adopt.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
  res.status(200).json(adopt);
};

const updateByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  req.body.images = typeof req.body.images === 'string' ? [req.body.images] : req.body.images;
  req.body.images = [
    ...map<any>(req.files, file => file.path.replace(config.uploadPath, '')),
    ...map<any>(req.body.images, image => image.replace(/^.*(?=(\/images))/, ''))
  ];
  let adopt = req['appAdopt'];
  adopt = extend(adopt, req.body);
  res.status(200).json(await adopt.save());
};

const deleteByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const adopt = req['appAdopt'];
  res.status(200).json(await adopt.destroy());
};


export { createHandler, listHandler, fetchByIdHandler, updateByIdHandler, deleteByIdHandler };

