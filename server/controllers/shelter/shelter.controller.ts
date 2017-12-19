import { NextFunction, Request, Response } from 'express';
import { extend, map } from 'lodash';

import config from '../../config';
import { createService, listService } from '../../services/shelter/shelter.service';

const createHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    body.images = map<any>(req.files, file => file.path.replace(config.uploadPath, ''));
    let shelter: any = await createService(body, req['appSelectedUser']);
    shelter = shelter.toJSON();
    shelter.isOwner = shelter.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
    res.status(200).json(shelter);
  } catch (err) {
    next(err);
  }
};

const listHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {offset, limit} = req.query;
    const shelters = await listService(offset, limit);
    shelters.list = map(shelters.list, (shelter: any) => {
      shelter = shelter.toJSON();
      shelter.isOwner = shelter.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
      return shelter;
    });
    res.status(200).json(shelters);
  } catch (err) {
    next(err);
  }
};

const fetchByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const shelter = req['appShelter'].toJSON();
  shelter.isOwner = shelter.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
  res.status(200).json(shelter);
};

const updateByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  req.body.images = typeof req.body.images === 'string' ? [req.body.images] : req.body.images;
  req.body.images = [
    ...map<any>(req.files, file => file.path.replace(config.uploadPath, '')),
    ...map<any>(req.body.images, image => image.replace(/^.*(?=(\/images))/, ''))
  ];
  let shelter = req['appShelter'];
  shelter = extend(shelter, req.body);
  res.status(200).json(await shelter.save());
};

const deleteByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const shelter = req['appShelter'];
  res.status(200).json(await shelter.destroy());
};


export { createHandler, listHandler, fetchByIdHandler, updateByIdHandler, deleteByIdHandler };

