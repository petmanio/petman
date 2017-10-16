import { json, urlencoded } from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as path from 'path';
import * as session from 'express-session';
import * as cookie from 'cookie-parser';
import * as morgan from 'morgan';
import * as config from './config';
import { randomBytes } from 'crypto';
import * as ngUniversal from '@nguniversal/express-engine';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { infoRouter } from './routes/info/info.route';
import { authRouter } from './routes/auth/auth.route';
import { cors, logger, loggerStream } from './services/util/util.service';

function universalRouter(req, res) {
  res.render('index', {
    req,
    res,
    providers: [{
      provide: 'serverUrl',
      useValue: `${req.protocol}://${req.get('host')}`
    }]
  });
}

function staticRouter(req, res) {
  res.sendfile(path.join(__dirname, '../client/platform-browser/index.html'));
}

const app: express.Application = express();

app.disable('x-powered-by');
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(compression());
//noinspection TypeScriptValidateTypes
app.use(morgan('combined', { stream: loggerStream }));
app.use(session({
  secret: config.secret,
  genid: () => randomBytes(48).toString('hex'),
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: null }
}));
app.use(cookie());
app.use(cors);
app.use(express.static(path.join(__dirname, '../client/platform-browser')));

if (process.env.UNIVERSAL_APP) {
  const appServer = require('../client/platform-server/main.bundle');
  app.engine('html', ngUniversal.ngExpressEngine({
    bootstrap: appServer.AppServerModuleNgFactory
  }));
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, '../client/platform-browser'));
}

// api routes
app.use('/api/info', infoRouter);
app.use('/api/auth', authRouter);
app.get('/*', process.env.UNIVERSAL_APP ? universalRouter : staticRouter);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const error = new Error('NOT_FOUND');
  next({error, status: 404});
});

// production error handler
// no stacktrace leaked to user
this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const statusCode = err.status || err.statusCode || 500;
  logger.error(err);
  const customError = {
    stack: config.env !== 'production' && err.error && err.error.stack,
    message: err.error ? (err.error.message || 'INTERNAL_ERROR') : 'INTERNAL_ERROR'
  };
  res.status(statusCode).send(customError);
});

export { app };
