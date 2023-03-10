import { NextFunction, Request, Response } from 'express';

import { listService, pinsService } from '../../services/organization/organization.service';
import { OrganizationListRequestDto, OrganizationPinsRequestDto } from '../../../common/models/organization.model';
import { getAcceptLanguage } from '../../services/util/util.service';

const listHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const organizations = await listService(<OrganizationListRequestDto>req.query, getAcceptLanguage(req.header('accept-language')));
    res.status(200).json(organizations);
  } catch (err) {
    next(err);
  }
};

const pinsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pins = await pinsService(<OrganizationPinsRequestDto>req.query, getAcceptLanguage(req.header('accept-language')));
    res.status(200).json(pins);
  } catch (err) {
    next(err);
  }
};

export { listHandler, pinsHandler };
