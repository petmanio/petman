import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { plainToClass } from 'class-transformer';
import { forEach } from 'lodash';

import { environment } from '../../../../environments/environment';
import {
  ShelterCreateRequestDto,
  ShelterCreateResponseDto,
  ShelterDto
} from '../../../../../common/models/shelter.model';

export interface IShelterService {
  create(body: ShelterCreateRequestDto): Observable<ShelterCreateResponseDto>;
  list(): Observable<any>;
}

@Injectable()
export class ShelterService implements IShelterService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {}

  create(body: ShelterCreateRequestDto): Observable<ShelterCreateResponseDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      formData.append('cost', body.price);
      forEach(body.images, file => formData.append('images', file, file.name));
    }
    return this.http.post<ShelterCreateResponseDto>(`${environment.apiEndpoint}/api/shelters`, formData);
  }

  list(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiEndpoint}/api/shelter/user`, {})
      .map(response => plainToClass(ShelterDto, response, {enableCircularCheck: false}));
  }
}
