import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule,
  MatPaginatorModule
} from '@angular/material';
import { CovalentFileModule, CovalentLoadingModule, CovalentMessageModule } from '@covalent/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '../shared/shared.module';

import { MapRoutingModule } from './map-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { MapService } from './shared/services/map/map.service';
import { MapEffects } from './shared/effects/map.effects';
import { reducers } from './shared/reducers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    CovalentFileModule,
    CovalentLoadingModule,
    CovalentMessageModule,
    InfiniteScrollModule,

    StoreModule.forFeature('map', reducers),
    EffectsModule.forFeature([MapEffects]),

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
