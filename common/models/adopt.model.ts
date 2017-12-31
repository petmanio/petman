import { Type } from 'class-transformer';
import { UserDto } from './user.model';
import { CommonListRequestDto } from '../shared';

function userDtoGetter() {
  return UserDto;
}

function adoptDtoGetter() {
  return AdoptDto;
}

export class AdoptDto {
  id: number;
  userId: number;
  description: string;
  images: string[];
  isOwner: boolean;
  created: Date;
  updated: Date;

  // @Type(() => UserDto)
  @Type(userDtoGetter)
  user: UserDto;
}

// POST adoptions
export class AdoptCreateRequestDto {
  description: string;
  images: File[];
}

export class AdoptCreateResponseDto extends AdoptDto {
}

// PUT adoptions/:id
export class AdoptUpdateRequestDto {
  id: number;
  description: string;
  images: any[];
}

export class AdoptUpdateResponseDto extends AdoptDto {
}

// DELETE adoptions/:id
export class AdoptDeleteRequestDto {
  id: number;
}

export class AdoptDeleteResponseDto extends AdoptDto {
}

// GET adoptions
export class AdoptListRequestDto extends CommonListRequestDto {
}

export class AdoptListResponseDto {
  total: number;

  // @Type(() => AdoptDto)
  @Type(adoptDtoGetter)
  list: AdoptDto[];
}

// GET adoptions/:id
