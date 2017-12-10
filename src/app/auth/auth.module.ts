import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { LoginFormSocialComponent } from './shared/components/login-form-social/login-form-social.component';
import { AuthGuard } from './shared/guards/auth-guard/auth.guard';
import { AuthService } from './shared/services/auth/auth.service';
import { AuthEffects } from './shared/effects/auth.effects';
import { reducers } from './shared/reducers';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),

    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    LoginFormSocialComponent,
  ],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [],
    };
  }
}
