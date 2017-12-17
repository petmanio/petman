import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { DBModule } from '@ngrx/db';
import { RouterStateSerializer, StoreRouterConnectingModule, } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {
  CovalentLayoutModule,
  CovalentMenuModule,
  CovalentNotificationsModule,
  CovalentSearchModule
} from '@covalent/core';
import { NgProgressInterceptor, NgProgressModule } from 'ngx-progressbar';

import { environment } from '../../environments/environment';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { metaReducers, reducers } from './shared/reducers/index';
import { CustomRouterStateSerializer } from '../shared/lib/util';
import { CustomHeadersInterceptor } from './shared/interseptors/custom-headers/custom-headers.interceptor';
import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { AppComponent } from './app/app.component';
import { CoreRoutingModule } from './core-routing.module';
import { NotFoundPageComponent } from './not-found/not-found-page';
import { HomePageComponent } from './home-page/home-page.component';
import { NavItemComponent } from './shared/components/nav-item/nav-item.component';
import { FooterComponent } from './shared/components/footer/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule.withServerTransition({appId: 'petman'}),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, {metaReducers}),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule,

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([]),

    /**
     * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
     * service available.
     */
    // DBModule.provideDB(schema),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatChipsModule,
    MatListModule,
    LayoutModule,
    CovalentSearchModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentLayoutModule,
    NgProgressModule,

    CoreRoutingModule,
    SharedModule
  ],
  exports: [AppComponent],
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    ToolbarComponent,
    SidenavComponent,
    HomePageComponent,
    NavItemComponent,
    FooterComponent
  ],
  providers: [
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
