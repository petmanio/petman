import { NextFunction, Request, Response } from 'express';

import { byIdService } from '../../services/shelter/shelter.service';

const shelterExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shelter: any = await byIdService(req.params.id);
    if (!shelter) {
      return res.status(404).end();
    }
    req['appShelter'] = shelter;
    next();
  } catch (err) {
    next(err);
  }
};

export { shelterExists };
