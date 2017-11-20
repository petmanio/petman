import { NextFunction, Request, Response } from 'express';
import { find } from 'lodash';
import { jwtVerify, logger } from '../../services/util/util.service';
import { User } from '../../models/User';
import { UserData } from '../../models/UserData';
import { AuthProvider } from '../../models/AuthProvider';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  const selectedUserId = req.header('x-selected-user');
  try {
    const {id} = jwtVerify(token);
    const user = await User.findById(id, {
      include: [UserData, AuthProvider, {
        model: User,
        as: 'businessUsers',
        include: [UserData, AuthProvider]
      }]
    });
    if (!user) {
      return res.status(401).end();
    }
    req['pmUser'] = user;
    const pmSelectedUser = find(req['pmUser'].businessUsers, {id: selectedUserId});
    req['pmSelectedUser'] = pmSelectedUser || req['pmUser'];
    next();
  } catch (err) {
    logger.error(err);
    return res.status(401).end();
  }
};

export { isAuthenticated };
