'use strict';
import { join } from 'path';
import { Config } from '../../common/shared';

const config: Config = {
  port: 80,
  secret: 'fRmRO5mqrW6gir6TRM06+FjCmo6frE86oxZ8wL+OvqA=',
  fileLog: join(__dirname, '../../../', 'petman.log'),
  sequelizeConfig: {
    dialect: '',
    database: '',
    username: '',
    password: ''
  },
  syncOptions: {},
  fb: {
    appId: '',
    appSecret: '',
    scope: ''
  },
  languages: ['en-US', 'hy-AM'],
  uploadPath: join(process.env.PWD, 'upload'),
  host: 'htts://petman.io'
};

export = config;
