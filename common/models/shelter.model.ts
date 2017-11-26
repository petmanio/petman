import { Type } from 'class-transformer';
import { UserDto } from './user.model';

function userDtoGetter() {
  return UserDto;
}

export class ShelterDto {
  id: number;
  userId: number;
  price: number;
  description: string;
  images: string[];
  created: Date;
  updated: Date;

  // @Type(() => UserDto)
  @Type(userDtoGetter)
  user: UserDto;
}

export class ShelterCreateRequestDto {
  price: string;
  description: string;
  images: File[];
}

export class ShelterCreateResponseDto extends ShelterDto {
}
