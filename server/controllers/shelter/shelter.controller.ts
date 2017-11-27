import { NextFunction, Request, Response } from 'express';
import { map } from 'lodash';

import config from '../../config';
import { createService } from '../../services/shelter/shelter.service';

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

export { createHandler };

