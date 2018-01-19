import { Type } from 'class-transformer';

import { UserDto } from './user.model';
import { AddressDto } from './address.model';
import { ServiceDto } from './service.model';
import { BranchDto } from './branch.model';
import { ProductDto } from './product.model';
import { CommonListRequestDto } from '../shared';
import { dtoGetter } from '../lib/util';
import { OrganizationPinType } from '../enums';

export class OrganizationDto {
  id: number;
  title: string;
  description: string;
  images: string[];
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

export class OrganizationPinDto {
  id: number;
  title: string;
  description: string;
  type: OrganizationPinType;

  @Type(dtoGetter(AddressDto))
  address: AddressDto;
}

// GET organizations
export class OrganizationListRequestDto extends CommonListRequestDto {
  service?: number | number[];
}

export class OrganizationListResponseDto {
  total: number;

  @Type(dtoGetter(OrganizationDto))
  list: OrganizationDto[];
}

// GET pins
export class OrganizationPinsRequestDto {
  service?: number | number[];
}

export class OrganizationPinsResponseDto {
  total: number;

  @Type(dtoGetter(OrganizationPinDto))
  pins: OrganizationPinDto[];
}
