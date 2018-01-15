import { NextFunction, Request, Response } from 'express';
import { map } from 'lodash';

import { listService } from '../../services/organization/organization.service';
import { OrganizationListRequestDto } from '../../../common/models/organization.model';

const listHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const organizations = await listService(<OrganizationListRequestDto>req.query);
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
