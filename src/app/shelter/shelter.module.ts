import { ModuleWithProviders, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ImageUploadModule } from 'angular2-image-upload';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from 'ngx-gallery';

import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

import { ShelterRoutingModule } from './shelter-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { ShelterService } from './shared/services/shelter/shelter.service';
import { ExistsGuard } from './shared/guards/exists/exists.guard';
import { IsOwnerGuard } from './shared/guards/is-owner/is-owner.guard';
import { ShelterEffects } from './shared/effects/shelter.effects';
import { reducers } from './shared/reducers';

@NgModule({
  imports: [
    ImageUploadModule.forRoot(),
    InfiniteScrollModule,
    NgxGalleryModule,

    StoreModule.forFeature('shelter', reducers),
    EffectsModule.forFeature([ShelterEffects]),

    MaterialModule,
    SharedModule,
    ShelterRoutingModule
  ],
  declarations: [
    ListPageComponent,
    AddPageComponent,
    DetailsPageComponent,
    EditPageComponent,
  ],
  providers: [DatePipe, ShelterService, ExistsGuard, IsOwnerGuard]
})
export class ShelterModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShelterModule,
      providers: [],
    };
  }
}
