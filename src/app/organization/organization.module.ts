import { ModuleWithProviders, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ImageUploadModule } from 'angular2-image-upload';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from 'ngx-gallery';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { OrganizationRoutingModule } from './organization-routing.module';
import { DetailsPageComponent } from './details-page/details-page.component';
import { OrganizationService } from './shared/services/organization/organization.service';
import { ExistsGuard } from './shared/guards/exists/exists.guard';
import { OrganizationEffects } from './shared/effects/organization.effects';
import { reducers } from './shared/reducers';

@NgModule({
  imports: [
    ImageUploadModule.forRoot(),
    InfiniteScrollModule,
    NgxGalleryModule,

    StoreModule.forFeature('organization', reducers),
    EffectsModule.forFeature([OrganizationEffects]),

    MaterialModule,
    SharedModule,
    OrganizationRoutingModule
  ],
  declarations: [
    DetailsPageComponent
  ],
  providers: [DatePipe, OrganizationService, ExistsGuard]
})
export class OrganizationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OrganizationModule,
      providers: [],
    };
  }
}
