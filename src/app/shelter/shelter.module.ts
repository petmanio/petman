import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { ShelterRoutingModule } from './shelter-routing.module';
import { AddPageComponent } from './add-page/add-page.component';
import { ShelterService } from './shared/services/shelter.service';
import { ShelterEffects } from './shared/effects/shelter.effects';
import { reducers } from './shared/reducers/index';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    StoreModule.forFeature('shelter', reducers),
    EffectsModule.forFeature([ShelterEffects]),

    SharedModule,
    ShelterRoutingModule
  ],
  declarations: [
    AddPageComponent
  ],
  providers: [ShelterService]
})
export class SitterModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SitterModule,
      providers: [],
    };
  }
}
