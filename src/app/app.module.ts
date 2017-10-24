import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './core/app/app.component';

@NgModule({
  declarations: [],
  imports: [
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
