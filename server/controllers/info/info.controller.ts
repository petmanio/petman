import { Request, Response } from 'express';

const pkg = require('../../../../package.json');

const indexHandler = (req: Request, res: Response) => {
  res.json({version: pkg.version});
};

export { indexHandler };

