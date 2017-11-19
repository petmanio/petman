import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilService } from './services/util/util.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [UtilService, LocalStorageService],
  exports: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
