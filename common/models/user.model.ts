import { Type } from 'class-transformer';
import { ShelterDto } from './shelter.model';
import { UserDataDto } from './user-data.model';

function userDtoGetter() {
  return UserDto;
}

function userDataDtoGetter() {
  return UserDataDto;
}

function shelterGetter() {
  return ShelterDto;
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

  // @Type(() => ShelterDto)
  @Type(shelterGetter)
  shelters: ShelterDto[];

  // @Type(() => UserDto)
  @Type(userDtoGetter)
  businessUsers: UserDto[];

  // @Type(() => UserDto)
  @Type(userDtoGetter)
  owners: UserDto[];
}
