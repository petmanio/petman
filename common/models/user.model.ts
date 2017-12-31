import { Type } from 'class-transformer';

import { ShelterDto } from './shelter.model';
import { UserDataDto } from './user-data.model';
import { AdoptDto } from './adopt.model';
import { WalkerDto } from './walker.model';

function userDtoGetter() {
  return UserDto;
}

function userDataDtoGetter() {
  return UserDataDto;
}

function shelterDtoGetter() {
  return ShelterDto;
}

function walkerDtoGetter() {
  return WalkerDto;
}

function adoptDtoGetter() {
  return AdoptDto;
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

  // TODO: tmp solution
  // @Type(() => UserDataDto)
  @Type(userDataDtoGetter)
  userData: UserDataDto;

  // @Type(() => ShelterDto)
  @Type(shelterDtoGetter)
  shelters: ShelterDto[];

  // @Type(() => WalkerDto)
  @Type(walkerDtoGetter)
  walkers: WalkerDto[];

  // @Type(() => AdoptDto)
  @Type(adoptDtoGetter)
  adoptions: AdoptDto[];

  // @Type(() => UserDto)
  @Type(userDtoGetter)
  businessUsers: UserDto[];

  // @Type(() => UserDto)
  @Type(userDtoGetter)
  owners: UserDto[];
}
