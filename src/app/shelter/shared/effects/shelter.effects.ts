import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { ShelterService } from '../services/shelter.service';
import * as Shelter from '../actions/shelter.action';

@Injectable()
export class ShelterEffects {
  constructor(private actions$: Actions,
              private shelterService: ShelterService,
              private router: Router) {
  }
}
