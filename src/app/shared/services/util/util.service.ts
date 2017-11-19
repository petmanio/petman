import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { environment } from '../../../../environments/environment';

export interface IUtilService {
  externalScripts(): void;
  registerNewIcons(): void;
}

@Injectable()
export class UtilService implements IUtilService {
  static getRouteDataByKey(activatedRoute, key: string): any {
    // TODO: Find better way to get data from activated route
    return activatedRoute.snapshot.data[key] ||
      (activatedRoute.snapshot.children.length && activatedRoute.snapshot.children[0].data[key]) ||
      (activatedRoute.snapshot.children[0].children.length && activatedRoute.snapshot.children[0].children[0].data[key]);
  }

  constructor(@Inject(PLATFORM_ID) protected platformId: Object,
              private matIconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
  }

  get XHRListener(): ReplaySubject<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const subject = new ReplaySubject<boolean>(1);
      const proxied = window['XMLHttpRequest'].prototype.send;
      window['XMLHttpRequest'].prototype.send = function () {
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

  externalScripts(): void {
    if (isPlatformBrowser(this.platformId)) {
      (<any>window).fbAsyncInit = () => {
        FB.init({
          appId: environment.fb.appId,
          xfbml: true,
          version: 'v2.9'
        });
        // FB.AppEvents.logPageView();
        FB.getLoginStatus(response => {
          if (response.status === 'connected') {
          } else if (response.status === 'not_authorized') {
          } else {
          }
        });
      };

      (function (d, s, id) {
        //noinspection TsLint
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      if (environment.gaId) {
        const currdate: any = new Date();
        const gaNewElem: any = {};
        const gaElems: any = {};

        (function (i: any, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;
          i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
          }, i[r].l = 1 * currdate;
          a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m);
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga', gaNewElem, gaElems);

        ga('create', environment.gaId, 'auto');
        ga('send', 'pageview');
      }
    }
  }

  registerNewIcons(): void {
    this.matIconRegistry.addSvgIcon('app_pet_health', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/stethoscope.svg'));
    this.matIconRegistry.addSvgIcon('app_facebook', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/facebook.svg'));
  }

}
