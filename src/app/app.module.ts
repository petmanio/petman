import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './core/app/app.component';
import { ShelterModule } from './shelter/shelter.module';
import { AdoptModule } from './adopt/adopt.module';

@NgModule({
  declarations: [],
  imports: [
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    ShelterModule.forRoot(),
    SharedModule.forRoot(),
    AdoptModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
