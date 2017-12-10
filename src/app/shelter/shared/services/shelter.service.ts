import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { plainToClass } from 'class-transformer';
import { forEach } from 'lodash';

import { environment } from '../../../../environments/environment';
import {
  ShelterCreateRequestDto,
  ShelterCreateResponseDto, ShelterDto,
  ShelterListRequestDto,
  ShelterListResponseDto
} from '../../../../../common/models/shelter.model';

export interface IShelterService {
  create(body: ShelterCreateRequestDto): Observable<ShelterCreateResponseDto>;
  getById(id: number): Observable<ShelterDto>;
  list(query: ShelterListRequestDto): Observable<ShelterListResponseDto>;
}

@Injectable()
export class ShelterService implements IShelterService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {}

  create(body: ShelterCreateRequestDto): Observable<ShelterCreateResponseDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      formData.append('price', body.price);
      forEach(body.images, file => formData.append('images', file, file.name));
    }
    return this.http.post<ShelterCreateResponseDto>(`${environment.apiEndpoint}/api/shelters`, formData)
      .map(response => plainToClass(ShelterCreateResponseDto, response, { enableCircularCheck: false }));
  }

  getById(id: number): Observable<ShelterDto> {
    return this.http
      .get<ShelterDto>(`${environment.apiEndpoint}/api/shelters/${id}`)
      .map(response => plainToClass(ShelterDto, response, { enableCircularCheck: false }));
  }

  list(query: ShelterListRequestDto): Observable<ShelterListResponseDto> {
    const params = new HttpParams()
      .set('offset', query.offset.toString())
      .set('limit', query.limit.toString());

    return this.http
      .get<ShelterListResponseDto>(`${environment.apiEndpoint}/api/shelters`, { params })
      .map(response => plainToClass(ShelterListResponseDto, response, { enableCircularCheck: false }));
  }
}
