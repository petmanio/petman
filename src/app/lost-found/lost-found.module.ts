import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule
} from '@angular/material';
import { CovalentFileModule, CovalentLoadingModule, CovalentMessageModule } from '@covalent/core';
import { ImageUploadModule } from 'angular2-image-upload';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from 'ngx-gallery';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../shared/shared.module';

import { LostFoundRoutingModule } from './lost-found-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LostFoundService } from './shared/services/lost-found/lost-found.service';
import { ExistsGuard } from './shared/guards/exists/exists.guard';
import { IsOwnerGuard } from './shared/guards/is-owner/is-owner.guard';
import { LostFoundEffects } from './shared/effects/lost-found.effects';
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
    MatSelectModule,
    MatChipsModule,
    CovalentFileModule,
    CovalentLoadingModule,
    CovalentMessageModule,
    ImageUploadModule.forRoot(),
    InfiniteScrollModule,
    NgxGalleryModule,
    QuillModule,

    StoreModule.forFeature('lostFound', reducers),
    EffectsModule.forFeature([LostFoundEffects]),

    SharedModule,
    LostFoundRoutingModule
  ],
  declarations: [
    ListPageComponent,
    AddPageComponent,
    DetailsPageComponent,
    EditPageComponent,
  ],
  providers: [DatePipe, LostFoundService, ExistsGuard, IsOwnerGuard]
})
export class LostFoundModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LostFoundModule,
      providers: [],
    };
  }
}
