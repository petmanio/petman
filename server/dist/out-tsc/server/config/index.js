"use strict";
var path_1 = require("path");
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var debug = require('debug')('petman:config');
function createConfig() {
    var config = require('./config');
    config.env = process.env.NODE_ENV || 'local';
    debug('applying application configuration');
    if (process.env.CONFIG_PATH) {
        if (fs_1.existsSync(process.env.CONFIG_PATH)) {
            debug("using " + process.env.CONFIG_PATH + " configurations");
            config = lodash_1.extend(config, require(process.env.CONFIG_PATH));
        }
        else {
            debug("config file not found in this path " + process.env.CONFIG_PATH);
        }
    }
    else if (config.env === 'local' && fs_1.existsSync(path_1.join(__dirname, './local.js'))) {
        debug("config env variable not found, using default configurations");
        config = lodash_1.extend(config, require(path_1.join(__dirname, './local.js')));
    }
    debug("applied configurations: \n" + JSON.stringify(config, null, 2));
    return config;
}
var config = createConfig();
module.exports = config;
//# sourceMappingURL=/home/andranik/Project/javascript/petman/dist/server/config/index.js.map