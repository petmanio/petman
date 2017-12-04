import { Type } from 'class-transformer';
import { UserDto } from './user.model';
import { CommonListRequestDto, CommonListResponse } from '../shared';

export class ShelterDto {
  id: number;
  userId: number;
  price: number;
  description: string;
  images: string[];
  created: Date;
  updated: Date;

  @Type(() => UserDto)
  user: UserDto;
}

export class ShelterCreateRequestDto {
  price: string;
  description: string;
  images: File[];
}

export class ShelterCreateResponseDto extends ShelterDto {
}

export class ShelterListRequestDto extends CommonListRequestDto {
}

export class ShelterListResponseDto {
  total: number;

  @Type(() => ShelterDto)
  list: ShelterDto[];
}
