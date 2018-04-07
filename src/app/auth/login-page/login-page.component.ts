import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAuth from '../shared/reducers';
import * as Auth from '../shared/actions/auth.action';

export interface ILoginPageComponent {
  onSubmit(): void;
}

@Component({
  selector: 'app-auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements ILoginPageComponent {
  pending$ = this.store.select(fromAuth.getLoginPagePending);
  error$ = this.store.select(fromAuth.getLoginPageError);

  constructor(private store: Store<fromAuth.State>) {
  }

  onSubmit(): void {
    this.store.dispatch(new Auth.FbLogin());
  }
}
