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
      tap(shelter => this.router.navigate(['shelters', shelter.id]))
    );

  @Effect()
  update$ = this.actions$
    .ofType(Shelter.UPDATE)
    .pipe(
      map((action: Shelter.Update) => action.payload),
      switchMap(shelter => {
        return this.shelterService.update(shelter)
          .pipe(
            map(response => new Shelter.UpdateSuccess(response)),
            catchError(error => of(new Shelter.UpdateFailure(error)))
          );
      })
    );


  @Effect({dispatch: false})
  updateSuccess$ = this.actions$
    .ofType(Shelter.UPDATE_SUCCESS)
    .pipe(
      map((action: Shelter.CreateSuccess) => action.payload),
      tap(shelter => this.router.navigate(['shelters', shelter.id]))
    );

  @Effect()
  load$ = this.actions$
    .ofType(Shelter.LOAD)
    .pipe(
      map((action: Shelter.Load) => action.payload),
      switchMap(id => {
        return this.shelterService.getById(id)
          .pipe(
            map(response => new Shelter.LoadSuccess(response)),
            catchError(error => of(new Shelter.LoadFailure(error)))
          );
      })
    );

  @Effect()
  list$ = this.actions$
    .ofType(Shelter.LIST)
    .pipe(
      map((action: Shelter.List) => action.payload),
      switchMap(query => {
        return this.shelterService.list(query)
          .pipe(
            map(response => new Shelter.ListSuccess(response)),
            catchError(error => of(new Shelter.ListFailure(error)))
          );
      })
    );

  @Effect()
  more$ = this.actions$
    .ofType(Shelter.MORE)
    .pipe(
      map((action: Shelter.More) => action.payload),
      switchMap(query => {
        return this.shelterService.list(query)
          .pipe(
            map(response => new Shelter.MoreSuccess(response)),
            catchError(error => of(new Shelter.MoreFailure(error)))
          );
      })
    );

  constructor(private actions$: Actions,
              private router: Router,
              private shelterService: ShelterService) {
  }
}
