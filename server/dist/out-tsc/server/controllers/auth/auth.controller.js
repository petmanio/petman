"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_service_1 = require("../../services/util/util.service");
var auth_service_1 = require("../../services/auth/auth.service");
var loginHandler = function (req, res, next) {
    var user;
    return auth_service_1.loginService({
        username: req.body.username,
        password: req.body.password
    })
        .then(function (data) {
        user = data;
        return util_service_1.jwtSign(user);
    })
        .then(function (token) {
        res.status(200).json({
            token: token,
            user: user
        });
    })
        .catch(next);
};
exports.loginHandler = loginHandler;
var userHandler = function (req, res, next) {
    res.status(200).json(req['appUser']);
};
exports.userHandler = userHandler;
//# sourceMappingURL=/home/andranik/Project/javascript/petman/dist/server/controllers/auth/auth.controller.js.map