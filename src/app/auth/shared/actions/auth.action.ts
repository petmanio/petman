import { Action } from '@ngrx/store';

import { FbAuthenticationResponseDto } from '../../../../../common/models/user.model';

export const LOGOUT = '[Auth] Logout';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';
export const FB_LOGIN = '[Auth] Fb Login';
export const FB_LOGIN_SUCCESS = '[Auth] Fb Login Success';
export const FB_LOGIN_FAILURE = '[Auth] Fb Login Failure';

export class FbLogin implements Action {
  readonly type = FB_LOGIN;

  constructor(public payload: any = null) {}
}

export class FbLoginSuccess implements Action {
  readonly type = FB_LOGIN_SUCCESS;

  constructor(public payload: any) {}
}

export class FbLoginFailure implements Action {
  readonly type = FB_LOGIN_FAILURE;

  constructor(public payload: any) {}
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
  | LoginRedirect
  | Logout;
