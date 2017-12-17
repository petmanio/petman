import { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { map } from 'lodash';

import config from '../../config';
import { byIdService, createService, listService } from '../../services/shelter/shelter.service';

const createHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    body.images = map<any>(req.files, file => file.path.replace(config.uploadPath, ''));
    let shelter: any = await createService(body, req['pmSelectedUser']);
    shelter = shelter.toJSON();
    shelter.isOwner = shelter.userId === (req['pmSelectedUser'] && req['pmSelectedUser'].id);
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
      shelter.isOwner = shelter.userId === (req['pmSelectedUser'] && req['pmSelectedUser'].id);
      return shelter;
    });
    res.status(200).json(shelters);
  } catch (err) {
    next(err);
  }
};

const byIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let shelter: any = await byIdService(req.params.id);
    if (!shelter) {
      return res.status(404).end();
    }
    shelter = shelter.toJSON();
    shelter.isOwner = shelter.userId === (req['pmSelectedUser'] && req['pmSelectedUser'].id);
    res.status(200).json(shelter);
  } catch (err) {
    next(err);
  }
};

export { createHandler, listHandler, byIdHandler };

