import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromOrganization from '../../reducers';
import * as Organization from '../../actions/organization.action';
import { OrganizationService } from '../../services/organization/organization.service';

@Injectable()
export class ExistsGuard implements CanActivate {
  constructor(private router: Router,
              private store: Store<fromOrganization.State>,
              private organizationService: OrganizationService) {
  }

  hasData(id: number): Observable<boolean> {
    return this.hasDataInStore(id)
      .pipe(
        switchMap(inStore => {
          if (inStore) {
            return of(inStore);
          }
          return this.hasDataInApi(id);
        })
      );
  }

  hasDataInStore(id: number): Observable<boolean> {
    return this.store.select(fromOrganization.getOrganizationEntities)
      .pipe(
        map(entities => !!entities[id]),
        take(1)
      );
  }

  hasDataInApi(id: number): Observable<boolean> {
    return this.organizationService.getById(id)
      .pipe(
        map(entity => new Organization.LoadSuccess(entity)),
        tap((action: Organization.LoadSuccess) => this.store.dispatch(action)),
        map(organization => !!organization),
        catchError(() => {
          this.router.navigate(['/404']);
          return of(false);
        })
      );
  }

  // TODO: fix catch 404 error and redirect
  // getFromStoreOrAPI(id: number): Observable<any> {
  //   return this.store.select(fromOrganization.getOrganizationEntities)
  //     .pipe(
  //       tap(entities => {
  //         if (!entities[id]) {
  //           this.store.dispatch(new Organization.Load(id));
  //         }
  //       }),
  //       filter(entities => !!entities[id]),
  //       take(1)
  //     );
  // }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasData(route.params['id']);
    // return this.getFromStoreOrAPI(route.params['id'])
    //   .pipe(
    //     switchMap(() => of(true)),
    //     catchError(() => {
    //       this.router.navigate(['/404']);
    //       return of(false);
    //     })
    //   );
  }
}
