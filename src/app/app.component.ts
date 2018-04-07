import 'rxjs/add/observable/combineLatest';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as fromRoot from './core/shared/reducers/index';
import * as fromAuth from './auth/shared/reducers/index';
import * as Auth from './auth/shared/actions/auth.action';
import * as Layout from './core/shared/actions/layout';
import * as Shared from './shared/actions/shared.action';
import { UtilService } from './shared/services/util/util.service';
import { LocalStorageService } from './shared/services/local-storage/local-storage.service';
import { UserDto } from '../../common/models/user.model';
import { TranslateService } from '@ngx-translate/core';

export interface IAppComponent {
  onSelectedUserChange($event): void;

  onLogOut(): void;

  toggleSidenav($event: Event): void;
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
  showSidenav$: Observable<boolean>;
  sideNavMode: 'side' | 'push' = 'side';
  sideNavState: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private utilService: UtilService,
              private store: Store<fromRoot.State>,
              private localStorageService: LocalStorageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private breakpointObserver: BreakpointObserver,
              // private translate: TranslateService,
              @Inject(PLATFORM_ID) protected platformId: Object) {
    this.utilService.externalScripts();
    this.utilService.registerNewIcons();
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
    this.user$ = this.store.select(fromAuth.getUser);
    this.selectedUser$ = this.store.select(fromAuth.getSelectedUser);

    // translate.setDefaultLang('en');
    //
    // translate.use('en');
  }

  ngOnInit(): void {
    this.store.dispatch(new Auth.User());
    this.store.dispatch(new Auth.ChangeUser(+this.localStorageService.getItem('selectedUserId')));
    this.store.dispatch(new Layout.CloseSidenav());
    this.store.dispatch(new Shared.ServiceList());

    const sidenavSubscription = this.showSidenav$.subscribe(state => {
      this.sideNavState = state;
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
      }
    });
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
          // const showSidenav = this.activatedRoute.data['showSidenav'];
          const showSidenav = UtilService.getRouteDataByKey(this.activatedRoute, 'showSidenav');
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

  onLogOut(): void {
    this.store.dispatch(new Auth.Logout());
  }
}
