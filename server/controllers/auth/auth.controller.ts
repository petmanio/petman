import { NextFunction, Request, Response } from 'express';
import { jwtSign } from '../../services/util/util.service';
import { loginService } from '../../services/auth/auth.service';

const loginHandler = (req: Request, res: Response, next: NextFunction) => {
  let user;
  return loginService({
    username: req.body.username,
    password: req.body.password
  })
    .then(data => {
      user = data;
      return jwtSign(user);
    })
    .then(token => {
      res.status(200).json({
        token,
        user
      });
    })
    .catch(next);
};

const userHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(req['appUser']);
};

export { loginHandler, userHandler };

