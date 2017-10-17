"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var info_controller_1 = require("../../controllers/info/info.controller");
var infoRouter = express_1.Router();
exports.infoRouter = infoRouter;
infoRouter
    .get('/', info_controller_1.indexHandler);
//# sourceMappingURL=/home/andranik/Project/javascript/petman/dist/server/routes/info/info.route.js.map