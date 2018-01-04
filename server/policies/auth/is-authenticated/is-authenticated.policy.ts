import { NextFunction, Request, Response } from 'express';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (!req['appUser']) {
    return res.status(401).end();
  }
  next();
};

export { isAuthenticated };
