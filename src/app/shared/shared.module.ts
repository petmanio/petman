import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule
} from '@angular/material';
import { ShareButtonsModule } from 'ngx-sharebuttons';

import { AsyncDelayPipe } from './pipes/async-delay/async-delay.pipe';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { GalleryImagesPipe } from './pipes/gallery-images/gallery-images.pipe';
import { UtilService } from './services/util/util.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { CardComponent } from './components/card/card.component';
import { MuuriComponent } from './components/muuri/muuri.component';
import { MuuriItemComponent } from './components/muuri-item/muuri-item.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ShareButtonsModule.forRoot()
  ],
  declarations: [
    AsyncDelayPipe,
    SafeHtmlPipe,
    GalleryImagesPipe,
    CardComponent,
    MuuriComponent,
    MuuriItemComponent,
    ShareDialogComponent,
    ConfirmationDialogComponent,
    UserDetailsComponent
  ],
  providers: [UtilService, LocalStorageService],
  exports: [
    AsyncDelayPipe,
    SafeHtmlPipe,
    GalleryImagesPipe,
    CardComponent,
    MuuriComponent,
    MuuriItemComponent,
    ShareDialogComponent,
    ConfirmationDialogComponent,
    UserDetailsComponent
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
