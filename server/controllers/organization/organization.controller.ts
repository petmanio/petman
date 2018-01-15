import { NextFunction, Request, Response } from 'express';
import { map } from 'lodash';

import { listService } from '../../services/organization/organization.service';

const listHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {offset, limit} = req.query;
    const organizations = await listService(offset, limit);
    organizations.list = map(organizations.list, (organization: any) => {
      organization = organization.toJSON();
      organization.isOwner = organization.userId === (req['appSelectedUser'] && req['appSelectedUser'].id);
      return organization;
    });
    res.status(200).json(organizations);
  } catch (err) {
    next(err);
  }
};

export { listHandler };
