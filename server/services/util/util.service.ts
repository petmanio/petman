import * as winston from 'winston';
import { sign, verify } from 'jsonwebtoken';

import config from '../../config';

const transports: any = [
  new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  })
];

if (config.fileLog) {
  transports.push(
    new winston.transports.File({
      level: 'debug',
      filename: config.fileLog,
      handleExceptions: true,
      json: true,
      maxFiles: 5,
      colorize: false
    })
  );
}

const logger = new winston.Logger({
  transports,
  exitOnError: false
});

const loggerStream: any = {
  write: (message, encoding) => logger.info(message)
};

const cors = (req, res, next) => {
  if (req.headers['origin']) {
    res.header('Access-Control-Allow-Origin', req.headers['origin']);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Expose-Headers', 'X-Auth-Token, X-Auth-DeviceId');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, X-Auth-Token, X-Auth-DeviceId');

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    return res.status(200).end();
  }

  next();
};

const jwtSign = (payload: any): string => {
  return sign(payload, config.secret, {expiresIn: 60 * 60 * 24 * 30});
};

const jwtVerify = (token: string): any => {
  return verify(token, config.secret);
};

const getUserFbAvatarByFbId = (facebookId: string): string => {
  return `https://graph.facebook.com/${facebookId}/picture?type=normal`;
};

export { logger, loggerStream, cors, jwtSign, jwtVerify, getUserFbAvatarByFbId };
