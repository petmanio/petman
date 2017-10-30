import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../../../environments/environment';
import { FbAuthenticationRequestDto, FbAuthenticationResponseDto } from '../../../../../common/models/user.model';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';

export interface IAuthService {
  getFacebookToken(): Subject<any>;
  fbLogin(options: FbAuthenticationRequestDto): Observable<FbAuthenticationResponseDto>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  getFacebookToken(): Subject<any> {
    const subject = new Subject();
    FB.login((response) => {
      if (response.authResponse) {
        subject.next(response.authResponse);
      } else {
        subject.error(new Error());
      }
    }, { scope: environment.fb.scope });

    return subject;
  }

  fbLogin(options: FbAuthenticationRequestDto): Observable<FbAuthenticationResponseDto> {
    return this.http
      .post<FbAuthenticationResponseDto>(`${environment.apiEndpoint}/api/auth/login/fb`, options)
      .map(response => {
        this.localStorageService.setItem('token', response.token);
        this.localStorageService.setItem('user', response.user);
        return response;
      });
  }
}
