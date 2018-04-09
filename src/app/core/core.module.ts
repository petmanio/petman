import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    MaterialModule,
    SharedModule
  ],
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    NavItemComponent,
    FooterComponent
  ],
  providers: [],
  exports: [
    ToolbarComponent,
    SidenavComponent,
    NavItemComponent,
    FooterComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
