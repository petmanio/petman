import { NextFunction, Request, Response } from 'express';
import { find } from 'lodash';

import { jwtVerify } from '../../services/util/util.service';
import { User } from '../../models/User';
import { UserData } from '../../models/UserData';
import { AuthProvider } from '../../models/AuthProvider';

const getAuthedUser = async (req: Request, res: Response, next: NextFunction) => {
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
    req['appUser'] = user.toJSON();
    const appSelectedUser = find(req['appUser'].businessUsers, {id: selectedUserId});
    req['appSelectedUser'] = appSelectedUser || req['appUser'];
    next();
  } catch (err) {
    next();
  }
};

export { getAuthedUser };
