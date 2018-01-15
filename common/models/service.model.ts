import { Type } from 'class-transformer';

import { dtoGetter } from '../../server/services/util/util.service';
import { ServiceI18nDto } from './service-i18n.model';
import { OrganizationDto } from './organization.model';
import { BranchDto } from './branch.model';

export class ServiceDto {
  created: Date;
  updated: Date;

  @Type(dtoGetter(ServiceI18nDto))
  i18n: ServiceI18nDto;

  @Type(dtoGetter(OrganizationDto))
  organizations: OrganizationDto[];

  @Type(dtoGetter(BranchDto))
  branches: BranchDto[];

}
