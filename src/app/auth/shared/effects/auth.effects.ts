import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../services/auth/auth.service';
import * as Auth from '../actions/auth.action';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';

@Injectable()
export class AuthEffects {
  @Effect()
  fbLogin$ = this.actions$.pipe(
    ofType(Auth.FB_LOGIN),
    map((action: Auth.FbLogin) => action.payload),
    switchMap(auth => this.authService.getFacebookToken()),
    switchMap(accessToken => {
      console.log(accessToken);
      return this.authService.fbLogin({ accessToken }).pipe(
        map(response => new Auth.FbLoginSuccess(response)),
        catchError(error => of(new Auth.FbLoginFailure(error)))
      );
    })
  );

  @Effect()
  user$ = this.actions$.pipe(
    ofType(Auth.USER),
    map((action: Auth.User) => action.payload),
    switchMap(() => {
      return this.authService.user().pipe(
        map(response => new Auth.UserSuccess(response)),
        catchError(error => of(new Auth.UserFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  userChange$ = this.actions$.pipe(
    ofType(Auth.CHANGE_USER),
    map((action: Auth.ChangeUser) => action.payload),
    tap((selectedUserId) => {
      this.authService.changeUser(selectedUserId);
      this.router.navigate(['/']);
    })
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(Auth.FB_LOGIN_SUCCESS),
    map(() => new Auth.User()),
    tap(() => this.router.navigate(['/']))
  );

  // @Effect({ dispatch: false })
  // loginRedirect$ = this.actions$.pipe(
  //   ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT),
  //   tap(() => this.authService.logOut())
  // );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(Auth.LOGOUT),
    tap(() => {
      this.authService.logOut();
      this.router.navigate(['/']);
    })
  );

  @Effect()
  init$: Observable<Auth.User> = defer(() => {
    return of(new Auth.User());
  });

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }
}
