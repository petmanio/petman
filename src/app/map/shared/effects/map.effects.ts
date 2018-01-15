import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';

import { MapService } from '../services/map/map.service';

@Injectable()
export class MapEffects {
  constructor(private actions$: Actions,
              private router: Router,
              private mapService: MapService) {
  }
}
