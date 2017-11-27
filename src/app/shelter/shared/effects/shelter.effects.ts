import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
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
      switchMap(shelter => {
        return this.shelterService.create(shelter)
          .pipe(
            map(response => new Shelter.CreateSuccess(response)),
            catchError(error => of(new Shelter.CreateFailure(error)))
          );
      })
    );

  @Effect({dispatch: false})
  createSuccess$ = this.actions$
    .ofType(Shelter.CREATE_SUCCESS)
    .pipe(
      map((action: Shelter.CreateSuccess) => action.payload),
      tap(shelter => this.router.navigate(['shelter', shelter.id]))
    );

  constructor(private actions$: Actions,
              private shelterService: ShelterService,
              private router: Router) {
  }
}
