import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { NavItemComponent } from './shared/components/nav-item/nav-item.component';
import { FooterComponent } from './shared/components/footer/footer/footer.component';

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
