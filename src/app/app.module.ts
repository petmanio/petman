import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './core/app/app.component';
import { SitterModule } from './shelter/shelter.module';

@NgModule({
  declarations: [],
  imports: [
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    SitterModule.forRoot(),
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
