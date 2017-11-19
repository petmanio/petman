import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { plainToClass } from 'class-transformer';

import { environment } from '../../../../environments/environment';
import { ShelterDto } from '../../../../../common/models/shelter.model';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';

export interface IShelterService {
  list(): Observable<any>;
}

@Injectable()
export class ShelterService implements IShelterService {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  list(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiEndpoint}/api/shelter/user`, {})
      .map(response => plainToClass(ShelterDto, response, {enableCircularCheck: false}));
  }
}
