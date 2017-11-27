import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ShelterService } from '../services/shelter.service';
import * as Shelter from '../actions/shelter.action';

@Injectable()
export class ShelterEffects {
  @Effect()
  create$ = this.actions$
    .ofType(Shelter.CREATE)
    .pipe(
      map((action: Shelter.Create) => action.payload),
      switchMap(shelter => this.shelterService.create(shelter)),
      map(response => new Shelter.CreateSuccess(response)),
      catchError(error => of(new Shelter.CreateFailure(error)))
    );

  constructor(private actions$: Actions,
              private shelterService: ShelterService,
              private router: Router) {
  }
}
