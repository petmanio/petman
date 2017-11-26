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
  syncOptions: {
    force: true
  },
  fb: {
    appId: '',
    appSecret: '',
    scope: ''
  }
};

export = config;
