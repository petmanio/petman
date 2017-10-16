import { NextFunction, Request, Response } from 'express';
import { jwtVerify } from '../../services/util/util.service';

module Policy {
  export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const token = req.header('x-auth-token');
    jwtVerify(token)
      .then((user) => {
        if (user) {
          req['appUser'] = user;
          return next();
        }
        res.status(401).end();
      })
      .catch(err => res.status(401).end());
  }
}

export = Policy;
