import { NextFunction, Request, Response } from 'express';
import { extend, map } from 'lodash';

import { listService } from '../../services/service/service.service';
import { getAcceptLanguage } from '../../services/util/util.service';

const listHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await listService(getAcceptLanguage(req.header('accept-language')));
    res.status(200).json(services);
  } catch (err) {
    next(err);
  }
};

export { listHandler };
