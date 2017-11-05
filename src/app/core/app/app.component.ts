import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../shared/reducers';
import * as fromAuth from '../../auth/shared/reducers';
import * as Auth from '../../auth/shared/actions/auth.action';
import { UtilService } from '../../shared/services/util/util.service';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage.service';
import { UserDto } from '../../../../common/models/user.model';

export interface IAppComponent {
  onSelectedUserChange($event): void;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, IAppComponent {
  loggedIn$: Observable<boolean>;
  user$: Observable<UserDto>;
  selectedUser$: Observable<UserDto>;
  XHRListener: Observable<boolean>;

  constructor(public utilService: UtilService,
              private store: Store<fromRoot.State>,
              private localStorageService: LocalStorageService) {
    this.utilService.externalScripts();
    this.utilService.registerNewIcons();
    this.XHRListener = this.utilService.XHRListener;
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
    this.user$ = this.store.select(fromAuth.getUser);
    this.selectedUser$ = this.store.select(fromAuth.getSelectedUser);
  }

  ngOnInit(): void {
    this.store.dispatch(new Auth.User());
    this.store.dispatch(new Auth.ChangeUser(+this.localStorageService.getItem('selectedUserId')));
  }

  onSelectedUserChange($event): void {
    this.store.dispatch(new Auth.ChangeUser($event.value));
  }
}
