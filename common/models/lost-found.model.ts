import { Type } from 'class-transformer';

import { UserDto } from './user.model';
import { CommonListRequestDto } from '../shared';
import { LostFoundType } from '../enums';

function userDtoGetter() {
  return UserDto;
}

function lostFoundDtoGetter() {
  return LostFoundDto;
}

export class LostFoundDto {
  id: number;
  userId: number;
  type: LostFoundType;
  description: string;
  images: string[];
  isOwner: boolean;
  created: Date;
  updated: Date;

  // @Type(() => UserDto)
  @Type(userDtoGetter)
  user: UserDto;
}

// POST lostFound
export class LostFoundCreateRequestDto {
  type: LostFoundType;
  description: string;
  images: File[];
}

export class LostFoundCreateResponseDto extends LostFoundDto {
}

// PUT lost-found/:id
export class LostFoundUpdateRequestDto {
  id: number;
  type: LostFoundType;
  description: string;
  images: any[];
}

export class LostFoundUpdateResponseDto extends LostFoundDto {
}

// DELETE lost-found/:id
export class LostFoundDeleteRequestDto {
  id: number;
}

export class LostFoundDeleteResponseDto extends LostFoundDto {
}

// GET lost-found
export class LostFoundListRequestDto extends CommonListRequestDto {
}

export class LostFoundListResponseDto {
  total: number;

  // @Type(() => LostFoundDto)
  @Type(lostFoundDtoGetter)
  list: LostFoundDto[];
}

// GET lost-found/:id
