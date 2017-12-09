import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';

import { AsyncDelayPipe } from './pipes/async-delay/async-delay.pipe';
import { UtilService } from './services/util/util.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { CardComponent } from './components/card/card.component';
import { MuuriComponent } from './components/muuri/muuri.component';
import { MuuriItemComponent } from './components/muuri-item/muuri-item.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';

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
    MatFormFieldModule
  ],
  declarations: [AsyncDelayPipe, CardComponent, MuuriComponent, MuuriItemComponent, ShareDialogComponent],
  providers: [UtilService, LocalStorageService],
  exports: [AsyncDelayPipe, CardComponent, MuuriComponent, MuuriItemComponent, ShareDialogComponent],
  entryComponents: [ShareDialogComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
