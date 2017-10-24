import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './core/app/app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CoreModule.forRoot(),
    AuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
