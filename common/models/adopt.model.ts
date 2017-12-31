import { Type } from 'class-transformer';
import { UserDto } from './user.model';
import { CommonListRequestDto } from '../shared';

export class AdoptDto {
  id: number;
  userId: number;
  description: string;
  images: string[];
  isOwner: boolean;
  created: Date;
  updated: Date;

  @Type(() => UserDto)
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

  @Type(() => AdoptDto)
  list: AdoptDto[];
}

// GET adoptions/:id
