import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../shared/reducers';
import { UtilService } from '../../shared/services/util/util.service';
import * as Auth from '../../auth/shared/actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  XHRListener: Observable<boolean>;

  constructor(public utilService: UtilService,
              private store: Store<fromRoot.State>) {
    this.utilService.externalScripts();
    this.utilService.registerNewIcons();
    this.XHRListener = this.utilService.XHRListener;
  }

  ngOnInit(): void {
    this.store.dispatch(new Auth.User());
  }
}
