import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ShareButtonsModule } from 'ngx-sharebuttons';

import { MaterialModule } from '../material/material.module';

import { AsyncDelayPipe } from './pipes/async-delay/async-delay.pipe';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { GalleryImagesPipe } from './pipes/gallery-images/gallery-images.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { UtilService } from './services/util/util.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { CardComponent } from './components/card/card.component';
import { MuuriComponent } from './components/muuri/muuri.component';
import { MuuriItemComponent } from './components/muuri-item/muuri-item.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { BrickComponent } from './components/brick/brick.component';
import { MasonryComponent } from './components/masonry/masonry.component';
import { MasonryItemComponent } from './components/masonry-item/masonry-item.component';
import { ShareButtonComponent } from './components/share-button/share-button.component';
import { AddApplicationComponent } from './components/add-application/add-application.component';
import { MediumEditorComponent } from './components/medium-editor/medium-editor.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { SharedService } from './services/shared/shared.service';

import { SharedEffects } from './effects/shared.effects';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ShareButtonsModule.forRoot(),

    MaterialModule,
    StoreModule.forFeature('shared', reducers),
    EffectsModule.forFeature([SharedEffects])

  ],
  declarations: [
    AsyncDelayPipe,
    SafeHtmlPipe,
    GalleryImagesPipe,
    KeysPipe,
    CardComponent,
    MuuriComponent,
    MuuriItemComponent,
    ShareDialogComponent,
    ConfirmationDialogComponent,
    UserDetailsComponent,
    BrickComponent,
    MasonryComponent,
    MasonryItemComponent,
    ShareButtonComponent,
    AddApplicationComponent,
    MediumEditorComponent,
    GoogleMapComponent,
  ],
  providers: [UtilService, LocalStorageService, SharedService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    AsyncDelayPipe,
    SafeHtmlPipe,
    GalleryImagesPipe,
    KeysPipe,
    CardComponent,
    MuuriComponent,
    MuuriItemComponent,
    ShareDialogComponent,
    ConfirmationDialogComponent,
    UserDetailsComponent,
    BrickComponent,
    MasonryComponent,
    MasonryItemComponent,
    ShareButtonComponent,
    AddApplicationComponent,
    MediumEditorComponent,
    GoogleMapComponent
  ],
  entryComponents: [ShareDialogComponent, ConfirmationDialogComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
