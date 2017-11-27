import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as Auth from '../../actions/auth.action';
import * as fromAuth from '../../reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(): Observable<boolean> {
    return of(true);
    // return this.store
    //   .select(fromAuth.getLoggedIn)
    //   .map(authed => {
    //     if (!authed) {
    //       this.store.dispatch(new Auth.LoginRedirect({}));
    //       return false;
    //     }
    //
    //     return true;
    //   })
    //   .take(1);
  }
}
