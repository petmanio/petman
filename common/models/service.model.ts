import { Type } from 'class-transformer';

import { dtoGetter } from '../lib/util';
import { OrganizationDto } from './organization.model';
import { BranchDto } from './branch.model';

export class ServiceDto {
  title: string;
  description: string;

  @Type(dtoGetter(OrganizationDto))
  organizations: OrganizationDto[];

  @Type(dtoGetter(BranchDto))
  branches: BranchDto[];

}
