import { NextFunction, Request, Response } from 'express';
import { find } from 'lodash';

import { jwtVerify } from '../../services/util/util.service';
import { User } from '../../models/User';
import { UserData } from '../../models/UserData';
import { AuthProvider } from '../../models/AuthProvider';

const getAuthedUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  let selectedUserId: string | number = req.header('x-selected-user');
  selectedUserId = selectedUserId && parseInt(selectedUserId, 0);
  try {
    const {id} = jwtVerify(token);
    let user = await User.findById<User>(id, {
      include: [UserData, AuthProvider, {
        model: User,
        as: 'businessUsers',
        include: [UserData, AuthProvider]
      }]
    });
    user = user.toJSON();
    user.businessUsers = user.businessUsers.map(businessUser => businessUser.toJSON());
    req['appUser'] = user;
    const appSelectedUser = find(req['appUser'].businessUsers, {id: selectedUserId});
    // console.log(appSelectedUser);
    req['appSelectedUser'] = appSelectedUser || req['appUser'];
    next();
  } catch (err) {
    next();
  }
};

export { getAuthedUser };
