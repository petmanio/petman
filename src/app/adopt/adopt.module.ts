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

import { AdoptRoutingModule } from './adopt-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AdoptService } from './shared/services/adopt/adopt.service';
import { ExistsGuard } from './shared/guards/exists/exists.guard';
import { IsOwnerGuard } from './shared/guards/is-owner/is-owner.guard';
import { AdoptEffects } from './shared/effects/adopt.effects';
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

    StoreModule.forFeature('adopt', reducers),
    EffectsModule.forFeature([AdoptEffects]),

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
