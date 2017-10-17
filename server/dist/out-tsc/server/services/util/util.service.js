"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var config = require("../../config");
var winston = require("winston");
var transports = [
    new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    })
];
if (config.fileLog) {
    transports.push(new winston.transports.File({
        level: 'debug',
        filename: config.fileLog,
        handleExceptions: true,
        json: true,
        maxFiles: 5,
        colorize: false
    }));
}
var logger = new winston.Logger({
    transports: transports,
    exitOnError: false
});
exports.logger = logger;
var loggerStream = {
    write: function (message, encoding) { return logger.info(message); }
};
exports.loggerStream = loggerStream;
var cors = function (req, res, next) {
    if (req.headers['origin']) {
        res.header('Access-Control-Allow-Origin', req.headers['origin']);
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    else {
        res.header('Access-Control-Allow-Origin', '*');
    }
    res.header('Access-Control-Expose-Headers', 'X-Auth-Token, X-Auth-DeviceId');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Auth-Token, X-Auth-DeviceId');
    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        return res.status(200).end();
    }
    next();
};
exports.cors = cors;
var jwtSign = function (payload) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(jwt.sign(payload, config.secret));
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.jwtSign = jwtSign;
var jwtVerify = function (token) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(jwt.verify(token, config.secret));
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.jwtVerify = jwtVerify;
//# sourceMappingURL=/home/andranik/Project/javascript/petman/dist/server/services/util/util.service.js.map