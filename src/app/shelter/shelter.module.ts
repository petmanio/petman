import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule } from '@angular/material';
import { CovalentFileModule, CovalentLoadingModule, CovalentMessageModule } from '@covalent/core';
import { ImageUploadModule } from 'angular2-image-upload';

import { SharedModule } from '../shared/shared.module';

import { ShelterRoutingModule } from './shelter-routing.module';
import { AddPageComponent } from './add-page/add-page.component';
import { DetailsPageComponent } from './details/details.component';
import { ShelterService } from './shared/services/shelter.service';
import { ShelterEffects } from './shared/effects/shelter.effects';
import { reducers } from './shared/reducers/index';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    CovalentFileModule,
    CovalentLoadingModule,
    CovalentMessageModule,
    ImageUploadModule.forRoot(),
    StoreModule.forFeature('shelter', reducers),
    EffectsModule.forFeature([ShelterEffects]),

    SharedModule,
    ShelterRoutingModule
  ],
  declarations: [
    AddPageComponent,
    DetailsPageComponent
  ],
  providers: [ShelterService]
})
export class ShelterModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShelterModule,
      providers: [],
    };
  }
}
