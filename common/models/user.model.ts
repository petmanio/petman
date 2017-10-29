import { Exclude, Type } from 'class-transformer';
import { RoomDto } from './room';
import { UserDataDto } from './userData';

export class FbUser {
  id: number;
  email?: string;
  gender: string;
  first_name: string;
  last_name: string;
}

export class UserDto {
  email: string;
  userDataId: number;
  created: Date;
  updated: Date;
  @Exclude()
  deleted: Date;

  @Type(() => UserDataDto)
  userData: UserDataDto;

  @Type(() => RoomDto)
  rooms: RoomDto[];

  @Type(() => UserDto)
  businessUsers: UserDto[];

  @Type(() => UserDto)
  owners: UserDto[];
}

export class FbAuthenticationRequestDto {
  accessToken: string;
}

export class FbAuthenticationResponseDto {
  user: UserDto;
  token: string;
}
