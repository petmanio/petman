import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../services/auth/auth.service';
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

  @Effect()
  user$ = this.actions$
    .ofType(Auth.USER)
    .map((action: Auth.User) => action.payload)
    .switchMap(auth => this.authService.user())
    .map(response => new Auth.UserSuccess(response))
    .catch(error => of(new Auth.UserFailure(error)));

  @Effect({dispatch: false})
  userChange$ = this.actions$
    .ofType(Auth.CHANGE_USER)
    .map((action: Auth.ChangeUser) => action.payload)
    .do((selectedUserId) => this.authService.changeUser(selectedUserId));

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$
    .ofType(Auth.FB_LOGIN_SUCCESS)
    //  TODO: use router.navigate
    // .do(() => this.router.navigate(['/']))
    .do(() => location.href = '/');

  @Effect({dispatch: false})
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    //  TODO: use router.navigate
    .do(() => {
      this.authService.logOut();
      location.href = '/auth/login';
    });

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }
}
