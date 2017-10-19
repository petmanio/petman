import { NextFunction, Request, Response } from 'express';
import { find } from 'lodash';
import { jwtVerify, logger } from '../../services/util/util.service';
import { User } from '../../models/User';
import { UserData } from '../../models/UserData';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  const selectedUserId = req.header('x-selected-user');
  try {
    const {id} = jwtVerify(token);
    const user = await User.findById(id, {include: [UserData, {model: User, as: 'businessUsers', include: [UserData]}]});
    if (!user) {
      return res.status(401).end();
    }
    req['appUser'] = user;
    const appSelectedUser = find(req['appUser'].businessUsers, {id: selectedUserId});
    req['appSelectedUser'] = appSelectedUser || req['appUser'];
    next();
  } catch (err) {
    logger.error(err);
    return res.status(401).end();
  }
};

export { isAuthenticated };
