import { Exclude, Type } from 'class-transformer';
import { UserDto } from './user.model';
import { Gender } from '../enums/index';

export class UserDataDto {
  gender: Gender;
  avatar: string;
  firstName: string;
  lastName: string;
  userId: number;
  created: Date;

  @Type(() => UserDto)
  user: UserDto;
}
