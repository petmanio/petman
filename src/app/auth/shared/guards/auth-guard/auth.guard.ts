import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import * as Auth from '../../actions/auth.action';
import * as fromAuth from '../../reducers';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>,
              private authService: AuthService) { }

  hasUserInStore(): Observable<boolean> {
    return this.store.select(fromAuth.getLoggedIn)
      .pipe(
        map(authed => authed),
        take(1)
      );
  }

  hasUserInApi(): Observable<boolean> {
    return this.authService.user()
      .pipe(
        map(user => new Auth.UserSuccess(user)),
        tap((action: Auth.UserSuccess) => this.store.dispatch(action)),
        map(authed => !!authed),
        catchError(() => {
          this.store.dispatch(new Auth.LoginRedirect({}));
          return of(false);
        })
      );
  }

  authenticated(): Observable<boolean> {
    return this.hasUserInStore()
      .pipe(
        switchMap(inStore => {
          if (inStore) {
            return of(inStore);
          }
          return this.hasUserInApi();
        })
      );
  }

  canActivate(): Observable<boolean> {
    return this.authenticated();
  }
}
