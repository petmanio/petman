"use strict";
var util_service_1 = require("../../services/util/util.service");
var Policy;
(function (Policy) {
    function isAuthenticated(req, res, next) {
        var token = req.header('x-auth-token');
        util_service_1.jwtVerify(token)
            .then(function (user) {
            if (user) {
                req['appUser'] = user;
                return next();
            }
            res.status(401).end();
        })
            .catch(function (err) { return res.status(401).end(); });
    }
    Policy.isAuthenticated = isAuthenticated;
})(Policy || (Policy = {}));
module.exports = Policy;
//# sourceMappingURL=/home/andranik/Project/javascript/petman/dist/server/policies/isAuthenticated/isAuthenticated.policy.js.map