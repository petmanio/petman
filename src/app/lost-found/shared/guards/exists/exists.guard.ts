import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromLostFound from '../../reducers';
import * as LostFound from '../../actions/lost-found.action';
import { LostFoundService } from '../../services/lost-found/lost-found.service';

@Injectable()
export class ExistsGuard implements CanActivate {
  constructor(private router: Router,
              private store: Store<fromLostFound.State>,
              private lostFoundService: LostFoundService) {
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
    return this.store.select(fromLostFound.getLostFoundEntities)
      .pipe(
        map(entities => !!entities[id]),
        take(1)
      );
  }

  hasDataInApi(id: number): Observable<boolean> {
    return this.lostFoundService.getById(id)
      .pipe(
        map(entity => new LostFound.LoadSuccess(entity)),
        tap((action: LostFound.LoadSuccess) => this.store.dispatch(action)),
        map(lostFound => !!lostFound),
        catchError(() => {
          this.router.navigate(['/404']);
          return of(false);
        })
      );
  }

  // TODO: fix catch 404 error and redirect
  // getFromStoreOrAPI(id: number): Observable<any> {
  //   return this.store.select(fromLostFound.getLostFoundEntities)
  //     .pipe(
  //       tap(entities => {
  //         if (!entities[id]) {
  //           this.store.dispatch(new LostFound.Load(id));
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
