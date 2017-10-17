"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = require("body-parser");
var compression = require("compression");
var express = require("express");
var path = require("path");
var session = require("express-session");
var cookie = require("cookie-parser");
var morgan = require("morgan");
var crypto_1 = require("crypto");
var ngUniversal = require("@nguniversal/express-engine");
require("zone.js/dist/zone-node");
require("reflect-metadata");
var config = require("./config");
require("./init/db");
var info_route_1 = require("./routes/info/info.route");
var auth_route_1 = require("./routes/auth/auth.route");
var util_service_1 = require("./services/util/util.service");
// sequelize.sync()
//   .then(() => {
//     const person = User.build<User>({name: 'bob'});
//     person.save();
//   });
function universalRouter(req, res) {
    res.render('index', {
        req: req,
        res: res,
        providers: [{
                provide: 'serverUrl',
                useValue: req.protocol + "://" + req.get('host')
            }]
    });
}
function staticRouter(req, res) {
    res.sendfile(path.join(__dirname, '../client/platform-browser/index.html'));
}
var app = express();
exports.app = app;
app.disable('x-powered-by');
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(compression());
//noinspection TypeScriptValidateTypes
app.use(morgan('combined', { stream: util_service_1.loggerStream }));
app.use(session({
    secret: config.secret,
    genid: function () { return crypto_1.randomBytes(48).toString('hex'); },
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
}));
app.use(cookie());
app.use(util_service_1.cors);
app.use(express.static(path.join(__dirname, '../client/platform-browser')));
if (process.env.UNIVERSAL_APP) {
    var appServer = require('../client/platform-server/main.bundle');
    app.engine('html', ngUniversal.ngExpressEngine({
        bootstrap: appServer.AppServerModuleNgFactory
    }));
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '../client/platform-browser'));
}
// api routes
app.use('/api/info', info_route_1.infoRouter);
app.use('/api/auth', auth_route_1.authRouter);
app.get('/*', process.env.UNIVERSAL_APP ? universalRouter : staticRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var error = new Error('NOT_FOUND');
    next({ error: error, status: 404 });
});
// production error handler
// no stacktrace leaked to user
this.app.use(function (err, req, res, next) {
    var statusCode = err.status || err.statusCode || 500;
    util_service_1.logger.error(err);
    var customError = {
        stack: config.env !== 'production' && err.error && err.error.stack,
        message: err.error ? (err.error.message || 'INTERNAL_ERROR') : 'INTERNAL_ERROR'
    };
    res.status(statusCode).send(customError);
});
//# sourceMappingURL=/home/andranik/Project/javascript/petman/dist/server/app.js.map