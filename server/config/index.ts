import { join } from 'path';
import { existsSync } from 'fs';
import { extend } from 'lodash';
import { Config } from '../types';

const debug = require('debug')('petman:config');

/**
 * Create application configurations
 * @returns {Config}
 */
function createConfig() {
  let config: Config = require('./config');
  config.env = process.env.NODE_ENV || 'local';

  debug('applying application configuration');
  if (process.env.CONFIG_PATH) {
    if (existsSync(process.env.CONFIG_PATH)) {
      debug(`using ${process.env.CONFIG_PATH} configurations`);
      config = extend(config, require(process.env.CONFIG_PATH));
    } else {
      debug(`config file not found in this path ${process.env.CONFIG_PATH}`);
    }
  } else if (config.env === 'local' && existsSync(join(__dirname, './local.js'))) {
    debug(`config env variable not found, using default configurations`);
    config = extend(config, require(join(__dirname, './local.js')));
  }

  debug(`applied configurations: \n${JSON.stringify(config, null, 2)}`);

  return config;
}

const config = createConfig();

export = config;
