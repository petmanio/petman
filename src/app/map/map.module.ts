import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

import { MapRoutingModule } from './map-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { MapService } from './shared/services/map/map.service';
import { MapEffects } from './shared/effects/map.effects';
import { reducers } from './shared/reducers';

@NgModule({
  imports: [
    InfiniteScrollModule,

    StoreModule.forFeature('map', reducers),
    EffectsModule.forFeature([MapEffects]),

    MaterialModule,
    SharedModule,
    MapRoutingModule
  ],
  declarations: [
    ListPageComponent
  ],
  providers: [MapService]
})
export class MapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MapModule,
      providers: [],
    };
  }
}
