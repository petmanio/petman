import { NextFunction, Request, Response } from 'express';

const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  if (req['appSelectedUser'].id === req['appShelter'].userId) {
    return next();
  }
  res.status(403).end();
};

export { isOwner };
