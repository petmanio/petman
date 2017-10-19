import { NextFunction, Request, Response } from 'express';
import { findOrCreateFbUser, getUserFbDataByAccessToken, signUserId } from '../../services/auth/auth.service';
import { UserDto } from '../../../common/models/user';
import { plainToClass } from 'class-transformer';

const loginHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(501).end();
};

const loginFbHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fbUser = await getUserFbDataByAccessToken(req.body.accessToken);
    const user = await findOrCreateFbUser(fbUser, req.body.accessToken);
    const token = signUserId(user.id);
    // TODO: save token into db;
    // TODO: add DTO
    res.status(200).json({token, user});
  } catch (err) {
    next(err);
  }
};

const userHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(req['appUser']);
};

export { loginHandler, loginFbHandler, userHandler };

