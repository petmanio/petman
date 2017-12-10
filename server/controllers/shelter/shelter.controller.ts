import { NextFunction, Request, Response } from 'express';
import { map } from 'lodash';

import config from '../../config';
import { byIdService, createService, listService } from '../../services/shelter/shelter.service';

const createHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    body.images = map<any>(req.files, file => file.path.replace(config.uploadPath, ''));
    const shelter = await createService(body, req['pmSelectedUser']);
    res.status(200).json(shelter);
  } catch (err) {
    next(err);
  }
};

const listHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {offset, limit} = req.query;
    const list = await listService(offset, limit);
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const byIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shelter = await byIdService(req.params.id);
    if (!shelter) {
      return res.status(404).end();
    }
    res.status(200).json(shelter);
  } catch (err) {
    next(err);
  }
};

export { createHandler, listHandler, byIdHandler };

