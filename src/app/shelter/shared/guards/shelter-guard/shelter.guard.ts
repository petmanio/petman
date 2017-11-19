import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as Shelter from '../../actions/shelter.action';
import * as fromShelter from '../../reducers';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ShelterGuard implements CanActivate {
  constructor(private store: Store<fromShelter.State>) {}

  canActivate(): Observable<boolean> {
    return of(true);
  }
}
