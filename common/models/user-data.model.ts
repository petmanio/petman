import { Type } from 'class-transformer';
import { UserDto } from './user.model';
import { Gender } from '../enums';

function userDtoGetter() {
  return UserDto;
}

// TODO: merge with user
export class UserDataDto {
  gender: Gender;
  avatar: string;
  facebook: string;
  firstName: string;
  lastName: string;
  userId: number;
  created: Date;

  get name(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`;
  }

  // @Type(() => UserDto)
  @Type(userDtoGetter)
  user: UserDto;
}
