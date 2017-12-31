import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { WalkerService } from '../services/walker/walker.service';
import * as Walker from '../actions/walker.action';

@Injectable()
export class WalkerEffects {
  @Effect()
  create$ = this.actions$
    .ofType(Walker.CREATE)
    .pipe(
      map((action: Walker.Create) => action.payload),
      switchMap(walker => {
        return this.walkerService.create(walker)
          .pipe(
            map(response => new Walker.CreateSuccess(response)),
            catchError(error => of(new Walker.CreateFailure(error)))
          );
      })
    );

  @Effect({dispatch: false})
  createSuccess$ = this.actions$
    .ofType(Walker.CREATE_SUCCESS)
    .pipe(
      map((action: Walker.CreateSuccess) => action.payload),
      tap(walker => this.router.navigate(['walkers', walker.id]))
    );

  @Effect()
  update$ = this.actions$
    .ofType(Walker.UPDATE)
    .pipe(
      map((action: Walker.Update) => action.payload),
      switchMap(walker => {
        return this.walkerService.update(walker)
          .pipe(
            map(response => new Walker.UpdateSuccess(response)),
            catchError(error => of(new Walker.UpdateFailure(error)))
          );
      })
    );

  @Effect({dispatch: false})
  updateSuccess$ = this.actions$
    .ofType(Walker.UPDATE_SUCCESS)
    .pipe(
      map((action: Walker.CreateSuccess) => action.payload),
      tap(walker => this.router.navigate(['walkers', walker.id]))
    );

  @Effect()
  delete$ = this.actions$
    .ofType(Walker.DELETE)
    .pipe(
      map((action: Walker.Delete) => action.payload),
      switchMap(walker => {
        return this.walkerService.delete(walker)
          .pipe(
            map(response => new Walker.DeleteSuccess(response)),
            catchError(error => of(new Walker.DeleteFailure(error)))
          );
      })
    );

  @Effect({dispatch: false})
  deleteSuccess$ = this.actions$
    .ofType(Walker.DELETE_SUCCESS)
    .pipe(
      map((action: Walker.CreateSuccess) => action.payload),
      tap(walker => this.router.navigate(['walkers']))
    );

  @Effect()
  load$ = this.actions$
    .ofType(Walker.LOAD)
    .pipe(
      map((action: Walker.Load) => action.payload),
      switchMap(id => {
        return this.walkerService.getById(id)
          .pipe(
            map(response => new Walker.LoadSuccess(response)),
            catchError(error => of(new Walker.LoadFailure(error)))
          );
      })
    );

  @Effect()
  list$ = this.actions$
    .ofType(Walker.LIST)
    .pipe(
      map((action: Walker.List) => action.payload),
      switchMap(query => {
        return this.walkerService.list(query)
          .pipe(
            map(response => new Walker.ListSuccess(response)),
            catchError(error => of(new Walker.ListFailure(error)))
          );
      })
    );

  @Effect()
  more$ = this.actions$
    .ofType(Walker.MORE)
    .pipe(
      map((action: Walker.More) => action.payload),
      switchMap(query => {
        return this.walkerService.list(query)
          .pipe(
            map(response => new Walker.MoreSuccess(response)),
            catchError(error => of(new Walker.MoreFailure(error)))
          );
      })
    );

  constructor(private actions$: Actions,
              private router: Router,
              private walkerService: WalkerService) {
  }
}
