import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../../../environments/environment';
import { FbAuthenticationRequestDto, FbAuthenticationResponseDto } from '../../../../../common/models/user.model';

export interface IAuthService {
  // getFacebookToken(): ReplaySubject<any>;
  fbLogin(options: FbAuthenticationRequestDto): Observable<FbAuthenticationResponseDto>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(private http: HttpClient) {}

  private getFacebookToken(): ReplaySubject<any> {
    const subject = new ReplaySubject(1);
    FB.login((response) => {
      if (response.authResponse) {
        subject.next(response.authResponse);
      } else {
        subject.error(new Error());
      }
    }, { scope: environment.fb.scope });

    return subject;
  }

  fbLogin(): Observable<FbAuthenticationResponseDto> {
    return this.getFacebookToken()
      .switchMap(({ accessToken }) => {
        return this.http
          .post<FbAuthenticationResponseDto>(`${environment.apiEndpoint}/api/auth/login/fb`, { accessToken })
          .map(response => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            return response;
          });
      });
  }
}
