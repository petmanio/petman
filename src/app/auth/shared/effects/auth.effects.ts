import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../services/auth.service';
import * as Auth from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  @Effect()
  fbLogin$ = this.actions$
    .ofType(Auth.FB_LOGIN)
    .map((action: Auth.FbLogin) => action.payload)
    .switchMap(auth => this.authService.getFacebookToken())
    .map(fbData => fbData.accessToken)
    .switchMap(accessToken => this.authService.fbLogin({accessToken}))
    .map(response => new Auth.FbLoginSuccess(response))
    .catch(error => of(new Auth.FbLoginFailure(error)));

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$
    .ofType(Auth.FB_LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/']));

  @Effect({dispatch: false})
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .do(authed => this.router.navigate(['/auth/login']));

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }
}
