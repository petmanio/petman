import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShelter from '../shared/reducers';
// import * as Shelter from '../shared/actions/shelter.action';

@Component({
  selector: 'app-shelter-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent {
  constructor(private store: Store<fromShelter.State>) {
  }
}
