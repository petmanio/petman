import { NextFunction, Request, Response } from 'express';

const isLostFoundOwner = async (req: Request, res: Response, next: NextFunction) => {
  if (req['appSelectedUser'].id === req['appLostFound'].userId) {
    return next();
  }
  res.status(403).end();
};

export { isLostFoundOwner };
