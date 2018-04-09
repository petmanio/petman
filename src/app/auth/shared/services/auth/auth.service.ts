import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

import { environment } from '@environments/environment';

import {
  AuthenticationResponseDto,
  FbAuthenticationRequestDto,
  FbAuthenticationResponseDto,
} from '@common/models/auth.model';

import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

export interface IAuthService {
  getFacebookToken(): Observable<string>;

  fbLogin(options: FbAuthenticationRequestDto): Observable<FbAuthenticationResponseDto>;

  user(): Observable<AuthenticationResponseDto>;

  changeUser(selectedUserId: number): void;

  logOut(): void;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private ngZone: NgZone) {
  }

  getFacebookToken(): Observable<string> {
    return new Observable(observer => {
      FB.login((response) => {
        this.ngZone.run(() => {
          if (response.authResponse) {
            observer.next(response.authResponse.accessToken);
          } else {
            // TODO: handle error
            observer.error(new Error());
          }
        });
      }, { scope: environment.fb.scope });
    });
  }

  fbLogin(options: FbAuthenticationRequestDto): Observable<FbAuthenticationResponseDto> {
    return this.http
      .post<FbAuthenticationResponseDto>(`${environment.api}/api/auth/login/fb`, options).pipe(
        map(response => {
          this.localStorageService.setItem('token', response.token);
          this.localStorageService.setItem('user', response.user);
          return response;
        })
      );
  }

  user(): Observable<AuthenticationResponseDto> {
    return this.http
      .get<AuthenticationResponseDto>(`${environment.api}/api/auth/user`, {}).pipe(
        map(response => plainToClass(AuthenticationResponseDto, response, { enableCircularCheck: false })),
        map(response => {
          this.localStorageService.setItem('user', response);
          return response;
        })
      );
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
      location.reload();
    }
  }
}
