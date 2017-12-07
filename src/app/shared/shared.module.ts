import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';

import { AsyncDelayPipe } from './pipes/async-delay/async-delay.pipe';
import { UtilService } from './services/util/util.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { CardComponent } from './components/card/card.component';
import { MuuriComponent } from './components/muuri/muuri.component';
import { MuuriItemComponent } from './components/muuri-item/muuri-item.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [AsyncDelayPipe, CardComponent, MuuriComponent, MuuriItemComponent],
  providers: [UtilService, LocalStorageService],
  exports: [AsyncDelayPipe, CardComponent, MuuriComponent, MuuriItemComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
