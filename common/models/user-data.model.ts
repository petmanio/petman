import { Type } from 'class-transformer';
import { UserDto } from './user.model';
import { Gender } from '../enums';

export class UserDataDto {
  gender: Gender;
  avatar: string;
  firstName: string;
  lastName: string;
  userId: number;
  created: Date;

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Type(() => UserDto)
  user: UserDto;
}
