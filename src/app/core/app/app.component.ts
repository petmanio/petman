import 'rxjs/add/observable/combineLatest';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import * as fromRoot from '../shared/reducers';
import * as fromAuth from '../../auth/shared/reducers';
import * as Auth from '../../auth/shared/actions/auth.action';
import * as Layout from '../shared/actions/layout';
import { UtilService } from '../../shared/services/util/util.service';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage.service';
import { UserDto } from '../../../../common/models/user.model';

export interface IAppComponent {
  onSelectedUserChange($event): void;
  toggleSidenav($event: Event): void;
  closeSidenav(): void;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, IAppComponent {
  loggedIn$: Observable<boolean>;
  user$: Observable<UserDto>;
  selectedUser$: Observable<UserDto>;
  XHRListener$: Observable<boolean>;
  showSidenav$: Observable<boolean>;
  sideNavMode: 'side' | 'push' = 'side';
  sideNavState: boolean;
  private subscriptions: Subscription[] = [];

  constructor(public utilService: UtilService,
              private store: Store<fromRoot.State>,
              private localStorageService: LocalStorageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private breakpointObserver: BreakpointObserver) {
    this.utilService.externalScripts();
    this.utilService.registerNewIcons();
    this.XHRListener$ = this.utilService.XHRListener;
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
    this.user$ = this.store.select(fromAuth.getUser);
    this.selectedUser$ = this.store.select(fromAuth.getSelectedUser);
  }

  ngOnInit(): void {
    this.store.dispatch(new Auth.User());
    this.store.dispatch(new Auth.ChangeUser(+this.localStorageService.getItem('selectedUserId')));
    this.store.dispatch(new Layout.CloseSidenav());

    const sidenavSubscription = this.showSidenav$.subscribe(state =>  this.sideNavState = state);
    const routerBreakpointSubscription = Observable.combineLatest(
      this.router.events,
      this.breakpointObserver.observe([Breakpoints.Web]))
      .subscribe((event) => {
        const [active, breakpoint] = event;
        this.sideNavMode = breakpoint.matches ? 'side' : 'push';
        if (active instanceof NavigationEnd) {
          if (!breakpoint.matches) {
            this.store.dispatch(new Layout.CloseSidenav());
          }
          const showSidenav = this.activatedRoute.data['showSidenav'];
          if (typeof showSidenav !== 'undefined') {
            if (showSidenav && breakpoint.matches) {
              this.store.dispatch(new Layout.OpenSidenav());
            } else {
              this.store.dispatch(new Layout.CloseSidenav());
            }
          }
        }
      });

    this.subscriptions.push(sidenavSubscription);
    this.subscriptions.push(routerBreakpointSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onSelectedUserChange($event): void {
    this.store.dispatch(new Auth.ChangeUser($event.value));
  }

  toggleSidenav($event: Event): void {
    $event.stopPropagation();
    if (this.sideNavState) {
      this.store.dispatch(new Layout.CloseSidenav());
    } else {
      this.store.dispatch(new Layout.OpenSidenav());
    }
  }

  closeSidenav(): void {
    this.store.dispatch(new Layout.CloseSidenav());
  }
}
