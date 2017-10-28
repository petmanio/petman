import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UtilService } from '../../shared/services/util/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  xhrListener: Observable<boolean>;

  constructor(public utilService: UtilService) {
    this.xhrListener = this.utilService.XHRListener;
  }
}
