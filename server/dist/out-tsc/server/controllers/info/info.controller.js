"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pkg = require('../../../../package.json');
var indexHandler = function (req, res) {
    res.json({ version: pkg.version });
};
exports.indexHandler = indexHandler;
//# sourceMappingURL=/home/andranik/Project/javascript/petman/dist/server/controllers/info/info.controller.js.map