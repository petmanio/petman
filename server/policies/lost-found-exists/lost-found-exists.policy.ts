import { NextFunction, Request, Response } from 'express';

import { fetchByIdService } from '../../services/lost-found/lost-found.service';

const lostFoundExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lostFound: any = await fetchByIdService(req.params.id);
    if (!lostFound) {
      return res.status(404).end();
    }
    req['appLostFound'] = lostFound;
    next();
  } catch (err) {
    next(err);
  }
};

export { lostFoundExists };
