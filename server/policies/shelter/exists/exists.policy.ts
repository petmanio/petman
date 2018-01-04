import { NextFunction, Request, Response } from 'express';

import { fetchByIdService } from '../../../services/shelter/shelter.service';

const exists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shelter: any = await fetchByIdService(req.params.id);
    if (!shelter) {
      return res.status(404).end();
    }
    req['appShelter'] = shelter;
    next();
  } catch (err) {
    next(err);
  }
};

export { exists };
