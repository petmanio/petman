import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShelter from '../shared/reducers';
// import * as Shelter from '../shared/actions/shelter.action';

@Component({
  selector: 'app-shelter-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent {
  constructor(private store: Store<fromShelter.State>) {
  }
}
