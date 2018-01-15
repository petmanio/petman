import { Type } from 'class-transformer';

import { AddressDto } from './address.model';
import { ServiceDto } from './service.model';
import { OrganizationDto } from './organization.model';
import { ProductDto } from './product.model';
import { dtoGetter } from '../../server/services/util/util.service';

export class BranchDto {
  id: number;
  title: string;
  description: string;
  images: string[];
  created: Date;
  updated: Date;

  organizationId: number;
  @Type(dtoGetter(OrganizationDto))
  organization: OrganizationDto;

  addressId: number;
  @Type(dtoGetter(AddressDto))
  address: AddressDto;

  @Type(dtoGetter(ServiceDto))
  services: ServiceDto[];

  @Type(dtoGetter(ProductDto))
  products: ProductDto[];
}
