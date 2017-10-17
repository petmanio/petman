"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../../controllers/auth/auth.controller");
var isAuthenticated_policy_1 = require("../../policies/isAuthenticated/isAuthenticated.policy");
var authRouter = express_1.Router();
exports.authRouter = authRouter;
authRouter
    .post('/login', auth_controller_1.loginHandler)
    .get('/user', isAuthenticated_policy_1.isAuthenticated, auth_controller_1.userHandler);
//# sourceMappingURL=/home/andranik/Project/javascript/petman/dist/server/routes/auth/auth.route.js.map