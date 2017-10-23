import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatProgressBarModule, MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'petman' }),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: false }),
    MatSelectModule,
    MatButtonModule,
    AuthModule,
    SharedModule,
    CoreModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
