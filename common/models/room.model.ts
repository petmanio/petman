import { Type } from 'class-transformer';
import { UserDto } from './user.model';

function userDtoGetter() {
  return UserDto;
}

export class RoomDto {
  id: number;
  userId: number;
  created: Date;
  updated: Date;

  // @Type(() => UserDto)
  @Type(userDtoGetter)
  user: UserDto;
}
