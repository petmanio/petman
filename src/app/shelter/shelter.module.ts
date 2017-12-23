import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule,
  MatPaginatorModule
} from '@angular/material';
import { CovalentFileModule, CovalentLoadingModule, CovalentMessageModule } from '@covalent/core';
import { ImageUploadModule } from 'angular2-image-upload';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from 'ngx-gallery';

import { SharedModule } from '../shared/shared.module';

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
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    CovalentFileModule,
    CovalentLoadingModule,
    CovalentMessageModule,
    ImageUploadModule.forRoot(),
    NgxMasonryModule,
    InfiniteScrollModule,
    NgxGalleryModule,

    StoreModule.forFeature('shelter', reducers),
    EffectsModule.forFeature([ShelterEffects]),

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
