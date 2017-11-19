import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { LocalStorageService } from '../../../../shared/services/local-storage/local-storage.service';

@Injectable()
export class CustomHeadersInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      headers: req.headers.set('x-auth-token', this.localStorageService.getItem('token') || '')
    });
    return next.handle(req);
  }
}

