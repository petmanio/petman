import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShelter from '../shared/reducers';
// import * as Shelter from '../shared/actions/shelter.action';

@Component({
  selector: 'app-shelter-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent {
  constructor(private store: Store<fromShelter.State>) {
  }
}
