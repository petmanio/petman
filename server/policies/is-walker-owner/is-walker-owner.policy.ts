import { NextFunction, Request, Response } from 'express';

const isWalkerOwner = async (req: Request, res: Response, next: NextFunction) => {
  if (req['appSelectedUser'].id === req['appWalker'].userId) {
    return next();
  }
  res.status(403).end();
};

export { isWalkerOwner };
