import { Action } from '@ngrx/store';
import { AuthenticationResponseDto, FbAuthenticationResponseDto } from '../../../../../common/models/auth.model';

export const LOGOUT = '[Auth] Logout';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';
export const FB_LOGIN = '[Auth] Fb Login';
export const FB_LOGIN_SUCCESS = '[Auth] Fb Login Success';
export const FB_LOGIN_FAILURE = '[Auth] Fb Login Failure';
export const USER = '[Auth] User';
export const USER_SUCCESS = '[Auth] User Success';
export const USER_FAILURE = '[Auth] User Failure';
export const CHANGE_USER = '[Auth] Change User';

export class FbLogin implements Action {
  readonly type = FB_LOGIN;

  constructor(public payload: any = null) {}
}

export class FbLoginSuccess implements Action {
  readonly type = FB_LOGIN_SUCCESS;

  constructor(public payload: FbAuthenticationResponseDto) {}
}

export class FbLoginFailure implements Action {
  readonly type = FB_LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export class User implements Action {
  readonly type = USER;

  constructor(public payload: any = null) {}
}

export class UserSuccess implements Action {
  readonly type = USER_SUCCESS;

  constructor(public payload: AuthenticationResponseDto) {}
}

export class UserFailure implements Action {
  readonly type = USER_FAILURE;

  constructor(public payload: any) {}
}

export class ChangeUser implements Action {
  readonly type = CHANGE_USER;

  constructor(public payload: number) {}
}

export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor(public payload: any) {}
}

export type Actions =
  | FbLogin
  | FbLoginSuccess
  | FbLoginFailure
  | User
  | UserSuccess
  | UserFailure
  | ChangeUser
  | LoginRedirect
  | Logout;
