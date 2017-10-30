import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../../../environments/environment';
import { FbAuthenticationRequestDto, FbAuthenticationResponseDto } from '../../../../../common/models/user.model';
import { of } from "rxjs/observable/of";
import { Subject } from "rxjs/Subject";

export interface IAuthService {
  getFacebookToken(): Subject<any>;
  fbLogin(options: FbAuthenticationRequestDto): Observable<FbAuthenticationResponseDto>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(private http: HttpClient) {}

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
        // console.log(JSON.stringify(response))
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return of(response);
      });
  }
}
