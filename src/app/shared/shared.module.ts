import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatListModule } from '@angular/material';

import { UtilService } from './services/util/util.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { CardComponent } from './components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule
  ],
  declarations: [CardComponent],
  providers: [UtilService, LocalStorageService],
  exports: [CardComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
