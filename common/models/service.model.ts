import { Type } from 'class-transformer';

import { dtoGetter } from '../lib/util';
import { ServiceI18nDto } from './service-i18n.model';
import { OrganizationDto } from './organization.model';
import { BranchDto } from './branch.model';

export class ServiceDto {
  title: string;
  description: string;
  created: Date;
  updated: Date;

  @Type(dtoGetter(OrganizationDto))
  organizations: OrganizationDto[];

  @Type(dtoGetter(BranchDto))
  branches: BranchDto[];

}
