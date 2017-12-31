import { Type } from 'class-transformer';
import { UserDto } from './user.model';

import { CommonListRequestDto } from '../shared';

function userDtoGetter() {
  return UserDto;
}

function walkerDtoGetter() {
  return WalkerDto;
}

export class WalkerDto {
  id: number;
  userId: number;
  price: number;
  description: string;
  images: string[];
  isOwner: boolean;
  created: Date;
  updated: Date;

  // @Type(() => UserDto)
  @Type(userDtoGetter)
  user: UserDto;
}

// POST walkers
export class WalkerCreateRequestDto {
  price: string;
  description: string;
}

export class WalkerCreateResponseDto extends WalkerDto {
}

// PUT walkers/:id
export class WalkerUpdateRequestDto {
  id: number;
  price: string;
  description: string;
}

export class WalkerUpdateResponseDto extends WalkerDto {
}

// DELETE walkers/:id
export class WalkerDeleteRequestDto {
  id: number;
}

export class WalkerDeleteResponseDto extends WalkerDto {
}

// GET walkers
export class WalkerListRequestDto extends CommonListRequestDto {
}

export class WalkerListResponseDto {
  total: number;

  // @Type(() => WalkerDto)
  @Type(walkerDtoGetter)
  list: WalkerDto[];
}

// GET walkers/:id
