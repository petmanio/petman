import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { AdoptService } from '../services/adopt.service';
import * as Adopt from '../actions/adopt.action';

@Injectable()
export class AdoptEffects {
  @Effect()
  create$ = this.actions$
    .ofType(Adopt.CREATE)
    .pipe(
      map((action: Adopt.Create) => action.payload),
      switchMap(adopt => {
        return this.adoptService.create(adopt)
          .pipe(
            map(response => new Adopt.CreateSuccess(response)),
            catchError(error => of(new Adopt.CreateFailure(error)))
          );
      })
    );

  @Effect({dispatch: false})
  createSuccess$ = this.actions$
    .ofType(Adopt.CREATE_SUCCESS)
    .pipe(
      map((action: Adopt.CreateSuccess) => action.payload),
      tap(adopt => this.router.navigate(['adoption', adopt.id]))
    );

  @Effect()
  update$ = this.actions$
    .ofType(Adopt.UPDATE)
    .pipe(
      map((action: Adopt.Update) => action.payload),
      switchMap(adopt => {
        return this.adoptService.update(adopt)
          .pipe(
            map(response => new Adopt.UpdateSuccess(response)),
            catchError(error => of(new Adopt.UpdateFailure(error)))
          );
      })
    );

  @Effect({dispatch: false})
  updateSuccess$ = this.actions$
    .ofType(Adopt.UPDATE_SUCCESS)
    .pipe(
      map((action: Adopt.CreateSuccess) => action.payload),
      tap(adopt => this.router.navigate(['adoption', adopt.id]))
    );

  @Effect()
  delete$ = this.actions$
    .ofType(Adopt.DELETE)
    .pipe(
      map((action: Adopt.Delete) => action.payload),
      switchMap(adopt => {
        return this.adoptService.delete(adopt)
          .pipe(
            map(response => new Adopt.DeleteSuccess(response)),
            catchError(error => of(new Adopt.DeleteFailure(error)))
          );
      })
    );

  @Effect({dispatch: false})
  deleteSuccess$ = this.actions$
    .ofType(Adopt.DELETE_SUCCESS)
    .pipe(
      map((action: Adopt.CreateSuccess) => action.payload),
      tap(adopt => this.router.navigate(['adoption']))
    );

  @Effect()
  load$ = this.actions$
    .ofType(Adopt.LOAD)
    .pipe(
      map((action: Adopt.Load) => action.payload),
      switchMap(id => {
        return this.adoptService.getById(id)
          .pipe(
            map(response => new Adopt.LoadSuccess(response)),
            catchError(error => of(new Adopt.LoadFailure(error)))
          );
      })
    );

  @Effect()
  list$ = this.actions$
    .ofType(Adopt.LIST)
    .pipe(
      map((action: Adopt.List) => action.payload),
      switchMap(query => {
        return this.adoptService.list(query)
          .pipe(
            map(response => new Adopt.ListSuccess(response)),
            catchError(error => of(new Adopt.ListFailure(error)))
          );
      })
    );

  @Effect()
  more$ = this.actions$
    .ofType(Adopt.MORE)
    .pipe(
      map((action: Adopt.More) => action.payload),
      switchMap(query => {
        return this.adoptService.list(query)
          .pipe(
            map(response => new Adopt.MoreSuccess(response)),
            catchError(error => of(new Adopt.MoreFailure(error)))
          );
      })
    );

  constructor(private actions$: Actions,
              private router: Router,
              private adoptService: AdoptService) {
  }
}
