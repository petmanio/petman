import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UtilService } from '../../shared/services/util/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  XHRListener: Observable<boolean>;

  constructor(public utilService: UtilService) {
    this.utilService.externalScripts();
    this.utilService.registerNewIcons();
    this.XHRListener = this.utilService.XHRListener;
  }

  ngOnInit(): void {
  }
}
