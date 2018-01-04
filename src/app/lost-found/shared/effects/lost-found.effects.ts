import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LostFoundService } from '../services/lost-found/lost-found.service';
import * as LostFound from '../actions/lost-found.action';

@Injectable()
export class LostFoundEffects {
  @Effect()
  create$ = this.actions$
    .ofType(LostFound.CREATE)
    .pipe(
      map((action: LostFound.Create) => action.payload),
      switchMap(lostFound => {
        return this.lostFoundService.create(lostFound)
          .pipe(
            map(response => new LostFound.CreateSuccess(response)),
            catchError(error => of(new LostFound.CreateFailure(error)))
          );
      })
    );

  @Effect({dispatch: false})
  createSuccess$ = this.actions$
    .ofType(LostFound.CREATE_SUCCESS)
    .pipe(
      map((action: LostFound.CreateSuccess) => action.payload),
      tap(lostFound => this.router.navigate(['lostFound', lostFound.id]))
    );

  @Effect()
  update$ = this.actions$
    .ofType(LostFound.UPDATE)
    .pipe(
      map((action: LostFound.Update) => action.payload),
      switchMap(lostFound => {
        return this.lostFoundService.update(lostFound)
          .pipe(
            map(response => new LostFound.UpdateSuccess(response)),
            catchError(error => of(new LostFound.UpdateFailure(error)))
          );
      })
    );

  @Effect({dispatch: false})
  updateSuccess$ = this.actions$
    .ofType(LostFound.UPDATE_SUCCESS)
    .pipe(
      map((action: LostFound.CreateSuccess) => action.payload),
      tap(lostFound => this.router.navigate(['lostFound', lostFound.id]))
    );

  @Effect()
  delete$ = this.actions$
    .ofType(LostFound.DELETE)
    .pipe(
      map((action: LostFound.Delete) => action.payload),
      switchMap(lostFound => {
        return this.lostFoundService.delete(lostFound)
          .pipe(
            map(response => new LostFound.DeleteSuccess(response)),
            catchError(error => of(new LostFound.DeleteFailure(error)))
          );
      })
    );

  @Effect({dispatch: false})
  deleteSuccess$ = this.actions$
    .ofType(LostFound.DELETE_SUCCESS)
    .pipe(
      map((action: LostFound.CreateSuccess) => action.payload),
      tap(lostFound => this.router.navigate(['lostFound']))
    );

  @Effect()
  load$ = this.actions$
    .ofType(LostFound.LOAD)
    .pipe(
      map((action: LostFound.Load) => action.payload),
      switchMap(id => {
        return this.lostFoundService.getById(id)
          .pipe(
            map(response => new LostFound.LoadSuccess(response)),
            catchError(error => of(new LostFound.LoadFailure(error)))
          );
      })
    );

  @Effect()
  list$ = this.actions$
    .ofType(LostFound.LIST)
    .pipe(
      map((action: LostFound.List) => action.payload),
      switchMap(query => {
        return this.lostFoundService.list(query)
          .pipe(
            map(response => new LostFound.ListSuccess(response)),
            catchError(error => of(new LostFound.ListFailure(error)))
          );
      })
    );

  @Effect()
  more$ = this.actions$
    .ofType(LostFound.MORE)
    .pipe(
      map((action: LostFound.More) => action.payload),
      switchMap(query => {
        return this.lostFoundService.list(query)
          .pipe(
            map(response => new LostFound.MoreSuccess(response)),
            catchError(error => of(new LostFound.MoreFailure(error)))
          );
      })
    );

  constructor(private actions$: Actions,
              private router: Router,
              private lostFoundService: LostFoundService) {
  }
}
