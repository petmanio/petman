import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromShelter from '../../reducers';
import * as Shelter from '../../actions/shelter.action';
import { ShelterService } from '../../services/shelter.service';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private router: Router,
              private store: Store<fromShelter.State>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.isOwner(route.params['id'])
      .pipe(
        switchMap(isOwner => {
          if (isOwner) {
            return of(isOwner);
          }
          this.router.navigate(['/404']);
          return of(false);
        })
      );
  }

  isOwner(id: number): Observable<boolean> {
    return this.store.select(fromShelter.getShelterEntities)
      .pipe(
        filter(entities => !!entities[id]),
        map(entities => entities[id]),
        map(entity => entity && entity.isOwner),
        take(1)
      );
  }
}
