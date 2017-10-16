'use strict';
import { join } from 'path';
import { Config } from '../types';

const config: Config = {
  port: 4300,
  secret: 'fRmRO5mqrW6gir6TRM06+FjCmo6frE86oxZ8wL+OvqA=',
  fileLog: join(__dirname, '../../../', 'petman.log')
};

export = config;
