import { ModuleWithProviders, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ImageUploadModule } from 'angular2-image-upload';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from 'ngx-gallery';

import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

import { reducers } from './shared/reducers';
import { AdoptRoutingModule } from './adopt-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AdoptService } from './shared/services/adopt/adopt.service';
import { ExistsGuard } from './shared/guards/exists/exists.guard';
import { IsOwnerGuard } from './shared/guards/is-owner/is-owner.guard';
import { AdoptEffects } from './shared/effects/adopt.effects';

@NgModule({
  imports: [
    ImageUploadModule.forRoot(),
    InfiniteScrollModule,
    NgxGalleryModule,

    StoreModule.forFeature('adopt', reducers),
    EffectsModule.forFeature([AdoptEffects]),

    MaterialModule,
    SharedModule,
    AdoptRoutingModule
  ],
  declarations: [
    ListPageComponent,
    AddPageComponent,
    DetailsPageComponent,
    EditPageComponent,
  ],
  providers: [DatePipe, AdoptService, ExistsGuard, IsOwnerGuard]
})
export class AdoptModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdoptModule,
      providers: [],
    };
  }
}
