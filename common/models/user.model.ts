import { Type } from 'class-transformer';
import { ShelterDto } from './shelter.model';
import { UserDataDto } from './user-data.model';

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

  @Type(() => UserDataDto)
  userData: UserDataDto;

  @Type(() => ShelterDto)
  shelters: ShelterDto[];

  @Type(() => UserDto)
  businessUsers: UserDto[];

  @Type(() => UserDto)
  owners: UserDto[];
}
