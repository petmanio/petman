import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { plainToClass } from 'class-transformer';

import { environment } from '../../../../../environments/environment';
import {
  AuthenticationResponseDto, FbAuthenticationRequestDto,
  FbAuthenticationResponseDto,
} from '../../../../../../common/models/auth.model';
import { LocalStorageService } from '../../../../shared/services/local-storage/local-storage.service';

export interface IAuthService {
  getFacebookToken(): Subject<any>;
  fbLogin(options: FbAuthenticationRequestDto): Observable<FbAuthenticationResponseDto>;
  user(): Observable<AuthenticationResponseDto>;
  changeUser(selectedUserId: number): void;
  logOut(): void;
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

  user(): Observable<AuthenticationResponseDto> {
    return this.http
      .get<AuthenticationResponseDto>(`${environment.apiEndpoint}/api/auth/user`, {})
      .map(response => plainToClass(AuthenticationResponseDto, response, {enableCircularCheck: false}))
      .map(response => {
        this.localStorageService.setItem('user', response);
        return response;
      });
  }

  logOut(): void {
    this.localStorageService.setItem('user', null);
    this.localStorageService.setItem('token', null);
    this.localStorageService.setItem('selectedUserId', null);
  }

  changeUser(selectedUserId: number): void {
    const storedSelectedId = this.localStorageService.getItem('selectedUserId');
    if (selectedUserId.toString() !== storedSelectedId) {
      this.localStorageService.setItem('selectedUserId', selectedUserId.toString());
      if (storedSelectedId) {
        // TODO: use angular service for reload
        location.reload();
      }
    }
  }
}
