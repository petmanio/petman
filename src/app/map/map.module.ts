import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
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
