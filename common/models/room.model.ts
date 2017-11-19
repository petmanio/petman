import { Type } from 'class-transformer';
import { UserDto } from './user.model';

export class RoomDto {
  id: number;
  userId: number;
  created: Date;
  updated: Date;

  @Type(() => UserDto)
  user: UserDto;
}
