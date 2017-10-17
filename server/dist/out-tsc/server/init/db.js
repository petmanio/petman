"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_typescript_1 = require("sequelize-typescript");
var config = require("../config/index");
var User_1 = require("../models/User");
var util_service_1 = require("../services/util/util.service");
var sequelize = new sequelize_typescript_1.Sequelize(config.dbConfig);
exports.sequelize = sequelize;
sequelize.addModels([User_1.User]);
sequelize
    .authenticate()
    .then(function () {
    util_service_1.logger.info('Connection has been established successfully.');
})
    .catch(function (err) {
    util_service_1.logger.error('Unable to connect to the database:', err);
});
//# sourceMappingURL=/home/andranik/Project/javascript/petman/dist/server/init/db.js.map