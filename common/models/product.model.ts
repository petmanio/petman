import { Type } from 'class-transformer';

import { dtoGetter } from '../lib/util';
import { UnitType } from '../enums';
import { CategoryDto } from './category.model';
import { OrganizationDto } from './organization.model';
import { BranchDto } from './branch.model';

export class ProductDto {
  id: number;
  title: string;
  description: string;
  basePrice: number;
  unit: UnitType;
  images: string[];
  created: Date;
  updated: Date;

  organizationId: number;
  @Type(dtoGetter(OrganizationDto))
  organization: OrganizationDto;

  @Type(dtoGetter(ProductDto))
  branches: BranchDto[];

  @Type(dtoGetter(CategoryDto))
  categories: CategoryDto[];
}
