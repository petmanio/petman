import { Type } from 'class-transformer';
import { UserDto } from './user';

export class RoomDto {
  userId: number;
  created: Date;
  updated: Date;

  @Type(() => UserDto)
  user: UserDto;
}
