import { UserDto } from './user.model';

export class FbAuthenticationRequestDto {
  accessToken: string;
}

export class FbAuthenticationResponseDto {
  user: UserDto;
  token: string;
}

export class AuthenticationResponseDto extends UserDto {
}
