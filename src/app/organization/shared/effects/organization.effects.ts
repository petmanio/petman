import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { OrganizationService } from '../services/organization/organization.service';
import * as Organization from '../actions/organization.action';

@Injectable()
export class OrganizationEffects {
  @Effect()
  load$ = this.actions$
    .ofType(Organization.LOAD)
    .pipe(
      map((action: Organization.Load) => action.payload),
      switchMap(id => {
        return this.organizationService.getById(id)
          .pipe(
            map(response => new Organization.LoadSuccess(response)),
            catchError(error => of(new Organization.LoadFailure(error)))
          );
      })
    );

  @Effect()
  list$ = this.actions$
    .ofType(Organization.LIST)
    .pipe(
      map((action: Organization.List) => action.payload),
      switchMap(query => {
        return this.organizationService.list(query)
          .pipe(
            map(response => new Organization.ListSuccess(response)),
            catchError(error => of(new Organization.ListFailure(error)))
          );
      })
    );

  @Effect()
  more$ = this.actions$
    .ofType(Organization.MORE)
    .pipe(
      map((action: Organization.More) => action.payload),
      switchMap(query => {
        return this.organizationService.list(query)
          .pipe(
            map(response => new Organization.MoreSuccess(response)),
            catchError(error => of(new Organization.MoreFailure(error)))
          );
      })
    );

  constructor(private actions$: Actions,
              private router: Router,
              private organizationService: OrganizationService) {
  }
}
