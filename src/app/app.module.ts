import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule, } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgProgressInterceptor, NgProgressModule } from 'ngx-progressbar';

import { CoreModule } from '@core/core.module';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@auth/auth.module';
import { ShelterModule } from '@shelter/shelter.module';
import { AdoptModule } from '@adopt/adopt.module';
import { LostFoundModule } from './lost-found/lost-found.module';
import { OrganizationModule } from '@organization/organization.module';
import { MapModule } from '@map/map.module';

import { environment } from '@environments/environment';
import { metaReducers, reducers } from './core/reducers';
import { CustomRouterStateSerializer } from '@shared/lib/util';
import { CustomHeadersInterceptor } from '@core/interseptors/custom-headers/custom-headers.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page';
import { HomePageComponent } from './home-page/home-page.component';
import { UtilService } from '@shared/services/util/util.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    HomePageComponent
  ],
  imports: [
    NgProgressModule,
    BrowserModule.withServerTransition({ appId: 'petman' }),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (UtilService.createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),

    AppRoutingModule,
    CoreModule.forRoot(),
    MaterialModule.forRoot(),
    AuthModule.forRoot(),
    ShelterModule.forRoot(),
    SharedModule.forRoot(),
    AdoptModule.forRoot(),
    LostFoundModule.forRoot(),
    OrganizationModule.forRoot(),
    MapModule.forRoot()
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
