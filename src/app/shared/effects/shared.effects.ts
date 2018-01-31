import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as Shared from '../actions/shared.action';
import { SharedService } from '../services/shared/shared.service';

@Injectable()
export class SharedEffects {
  @Effect()
  serviceList$ = this.actions$
    .ofType(Shared.SERVICE_LIST)
    .pipe(
      map((action: Shared.ServiceList) => action.payload),
      switchMap(query => {
        return this.sharedService.serviceList(query)
          .pipe(
            map(response => new Shared.ServiceListSuccess(response)),
            catchError(error => of(new Shared.ServiceListFailure(error)))
          );
      })
    );

  constructor(private actions$: Actions,
              private router: Router,
              private sharedService: SharedService) {
  }
}
