import { Type } from 'class-transformer';

import { UserDto } from './user.model';
import { AddressDto } from './address.model';
import { ServiceDto } from './service.model';
import { BranchDto } from './branch.model';
import { ProductDto } from './product.model';
import { CommonListRequestDto } from '../shared';
import { dtoGetter } from '../lib/util';

export class OrganizationDto {
  id: number;
  title: string;
  description: string;
  images: string[];
  isOwner: boolean;
  created: Date;
  updated: Date;

  userId: number;
  @Type(dtoGetter(UserDto))
  user: UserDto;

  addressId: number;
  @Type(dtoGetter(AddressDto))
  address: AddressDto;

  @Type(dtoGetter(ServiceDto))
  services: ServiceDto[];

  @Type(dtoGetter(BranchDto))
  branches: BranchDto[];

  @Type(dtoGetter(ProductDto))
  products: ProductDto[];
}

export class OrganizationFilterDto {
  service: string;
}

// GET organizations
export class OrganizationListRequestDto extends CommonListRequestDto {
  filter?: OrganizationFilterDto;
}

export class OrganizationListResponseDto {
  total: number;

  // @Type(() => OrganizationDto)
  @Type(dtoGetter(OrganizationDto))
  list: OrganizationDto[];
}

