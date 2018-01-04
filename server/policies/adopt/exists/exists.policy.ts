import { NextFunction, Request, Response } from 'express';

import { fetchByIdService } from '../../../services/adopt/adopt.service';

const exists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adopt: any = await fetchByIdService(req.params.id);
    if (!adopt) {
      return res.status(404).end();
    }
    req['appAdopt'] = adopt;
    next();
  } catch (err) {
    next(err);
  }
};

export { exists };
