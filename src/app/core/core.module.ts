import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { LocalStorageService } from './local-storage/local-storage.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [ToolbarComponent, SidenavComponent],
  declarations: [ToolbarComponent, SidenavComponent],
  providers: [LocalStorageService]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
