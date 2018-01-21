import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule
} from '@angular/material';
import { CovalentFileModule, CovalentLoadingModule, CovalentMessageModule } from '@covalent/core';
import { ImageUploadModule } from 'angular2-image-upload';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from 'ngx-gallery';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../shared/shared.module';

import { OrganizationRoutingModule } from './organization-routing.module';
import { DetailsPageComponent } from './details-page/details-page.component';
import { OrganizationService } from './shared/services/organization/organization.service';
import { ExistsGuard } from './shared/guards/exists/exists.guard';
import { OrganizationEffects } from './shared/effects/organization.effects';
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
    InfiniteScrollModule,
    NgxGalleryModule,
    QuillModule,

    StoreModule.forFeature('organization', reducers),
    EffectsModule.forFeature([OrganizationEffects]),

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
