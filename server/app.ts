import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import * as compression from 'compression';
import * as express from 'express';
import * as session from 'express-session';
import * as cookie from 'cookie-parser';
import * as morgan from 'morgan';
import * as domino from 'domino';
import { json, urlencoded } from 'body-parser';
import { randomBytes } from 'crypto';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import config from './config';
import './core/db';
import { cors, logger, loggerStream } from './services/util/util.service';
import { authedUser } from './policies/auth/authed-user/authed-user.policy';
import { infoRouter } from './routes/info/info.route';
import { authRouter } from './routes/auth/auth.route';
import { shelterRouter } from './routes/shelter/shelter.route';
import { walkerRouter } from './routes/walker/walker.route';
import { adoptRouter } from './routes/adopt/adopt.route';
import { lostFoundRouter } from './routes/lost-found/lost-found.route';
import { organizationRouter } from './routes/organization/organization.route';
import { serviceRouter } from './routes/service/service.route';

if (process.env.UNIVERSAL_APP) {
  const template = fs.readFileSync(path.join(__dirname, '../client/platform-browser/index.html')).toString();
  const win = domino.createWindow(template);

  Object.defineProperty(win.document.body.style, 'transform', {
    value: () => {
      return {
        enumerable: true,
        configurable: true
      };
    },
  });
  global['document'] = win.document;
  global['CSS'] = null;
  global['Prism'] = null;
  global['window'] = win;
  global['DOMTokenList'] = win.DOMTokenList;
  global['Node'] = win.Node;
  global['navigator'] = win.navigator;
  global['location'] = win.location;
  global['HTMLElement'] = win.HTMLElement;
  global['getComputedStyle'] = win.getComputedStyle;
  // global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
}

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
  res.sendFile(path.join(__dirname, '../client/platform-browser/index.html'));
}

// TODO: use ts-express-decorators
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
app.get('/', process.env.UNIVERSAL_APP ? universalRouter : staticRouter);
app.use(express.static(path.join(__dirname, '../client/platform-browser')));
app.use('/upload', express.static(config.uploadPath));

if (process.env.UNIVERSAL_APP) {
  const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../client/platform-server/main.bundle');
  app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }));

  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, '../client/platform-browser'));
}

// global policies;
app.use(authedUser);
// api routes
app.use('/api/info', infoRouter);
app.use('/api/auth', authRouter);
app.use('/api/shelters', shelterRouter);
app.use('/api/walkers', walkerRouter);
app.use('/api/adoption', adoptRouter);
app.use('/api/lost-found', lostFoundRouter);
app.use('/api/organizations', organizationRouter);
app.use('/api/services', serviceRouter);
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
