import { Type } from 'class-transformer';
import { UserDto } from './user.model';
import { CommonListRequestDto, CommonListResponse } from '../shared';

export class ShelterDto {
  id: number;
  userId: number;
  price: number;
  description: string;
  images: string[];
  isOwner: boolean;
  created: Date;
  updated: Date;

  @Type(() => UserDto)
  user: UserDto;
}

// POST shelters
export class ShelterCreateRequestDto {
  price: string;
  description: string;
  images: File[];
}

export class ShelterCreateResponseDto extends ShelterDto {
}

// PUT shelters
export class ShelterUpdateRequestDto {
  price: string;
  description: string;
  images: any[];
}

export class ShelterUpdateResponseDto extends ShelterDto {
}

// GET shelters
export class ShelterListRequestDto extends CommonListRequestDto {
}

export class ShelterListResponseDto {
  total: number;

  @Type(() => ShelterDto)
  list: ShelterDto[];
}

// GET shelters/:id
