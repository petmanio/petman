import { NextFunction, Request, Response } from 'express';
import { find } from 'lodash';

import { jwtVerify, logger } from '../../services/util/util.service';
import { User } from '../../models/User';
import { UserData } from '../../models/UserData';
import { AuthProvider } from '../../models/AuthProvider';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (!req['pmUser']) {
    return res.status(401).end();
  }
  next();
};

export { isAuthenticated };
