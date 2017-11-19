import { Type } from 'class-transformer';
import { RoomDto } from './room.model';
import { UserDataDto } from './user-data.model';

function userDtoGetter() {
  return UserDto;
}

function userDataDtoGetter() {
  return UserDataDto;
}

function roomGetter() {
  return RoomDto;
}

export class FbUser {
  id: number;
  email?: string;
  gender: string;
  first_name: string;
  last_name: string;
}

export class UserDto {
  id: number;
  email: string;
  userDataId: number;
  created: Date;
  updated: Date;

  // TODO: use after angular-cli fix (find and replace all @Type with getter function)
  // @Type(() => UserDataDto)
  @Type(userDataDtoGetter)
  userData: UserDataDto;

  // @Type(() => RoomDto)
  @Type(roomGetter)
  rooms: RoomDto[];

  // @Type(() => UserDto)
  @Type(userDtoGetter)
  businessUsers: UserDto[];

  // @Type(() => UserDto)
  @Type(userDtoGetter)
  owners: UserDto[];
}
