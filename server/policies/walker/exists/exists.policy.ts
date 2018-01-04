import { NextFunction, Request, Response } from 'express';

import { fetchByIdService } from '../../../services/walker/walker.service';

const exists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const walker: any = await fetchByIdService(req.params.id);
    if (!walker) {
      return res.status(404).end();
    }
    req['appWalker'] = walker;
    next();
  } catch (err) {
    next(err);
  }
};

export { exists };
