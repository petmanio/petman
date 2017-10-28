import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class UtilService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object) { }

  get XHRListener(): ReplaySubject<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const subject = new ReplaySubject<boolean>(1);
      const proxied = window['XMLHttpRequest'].prototype.send;
      window['XMLHttpRequest'].prototype.send = function() {
        subject.next(true);
        const pointer = this;
        const intervalId = setInterval(() => {
          if (pointer.readyState !== 4) {
            // if (pointer.readyState === 1) {
            return;
          }
          subject.next(false);
          clearInterval(intervalId);
        }, 1);
        return proxied.apply(this, [].slice.call(arguments));
      };

      return subject;
    }
  }

}
