import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShelter from '../shared/reducers';

@Component({
  selector: 'app-shelter-login-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {

  constructor(private store: Store<fromShelter.State>) {}

  ngOnInit() {}
}
