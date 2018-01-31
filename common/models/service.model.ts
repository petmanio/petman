import { Type } from 'class-transformer';

import { dtoGetter } from '../lib/util';
import { OrganizationDto } from './organization.model';
import { BranchDto } from './branch.model';
import { CommonListRequestDto } from '../shared';

export class ServiceDto {
  id: number;
  title: string;
  description: string;

  @Type(dtoGetter(OrganizationDto))
  organizations: OrganizationDto[];

  @Type(dtoGetter(BranchDto))
  branches: BranchDto[];
}

// GET organizations
export class ServiceListRequestDto {
}

export class ServiceListResponseDto {
  total: number;

  @Type(dtoGetter(ServiceDto))
  list: ServiceDto[];
}
