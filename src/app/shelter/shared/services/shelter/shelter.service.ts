import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { plainToClass } from 'class-transformer';
import { forEach } from 'lodash';

import { environment } from '../../../../../environments/environment';
import {
  ShelterCreateRequestDto, ShelterCreateResponseDto, ShelterDeleteRequestDto, ShelterDeleteResponseDto,
  ShelterDto, ShelterListRequestDto, ShelterListResponseDto, ShelterUpdateRequestDto, ShelterUpdateResponseDto
} from '../../../../../../common/models/shelter.model';

export interface IShelterService {
  create(body: ShelterCreateRequestDto): Observable<ShelterCreateResponseDto>;
  update(body: ShelterUpdateRequestDto): Observable<ShelterUpdateResponseDto>;
  delete(body: ShelterDeleteRequestDto): Observable<ShelterDeleteResponseDto>;
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
    return this.http.post<ShelterCreateResponseDto>(`${environment.api}/api/shelters`, formData)
      .map(response => plainToClass(ShelterCreateResponseDto, response, { enableCircularCheck: false }));
  }

  update(body: ShelterUpdateRequestDto): Observable<ShelterUpdateResponseDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      formData.append('price', body.price);
      forEach(body.images, file => {
        if (typeof file === 'string') {
          formData.append('images', file);
        } else {
          formData.append('images', file, file.name);
        }
      });
    }
    return this.http.put<ShelterUpdateResponseDto>(`${environment.api}/api/shelters/${body.id}`, formData)
      .map(response => plainToClass(ShelterUpdateResponseDto, response, { enableCircularCheck: false }));
  }

  delete(body: ShelterDeleteRequestDto): Observable<ShelterDeleteResponseDto> {
    return this.http.delete<ShelterDeleteResponseDto>(`${environment.api}/api/shelters/${body.id}`)
      .map(response => plainToClass(ShelterDeleteResponseDto, response, { enableCircularCheck: false }));
  }

  getById(id: number): Observable<ShelterDto> {
    return this.http
      .get<ShelterDto>(`${environment.api}/api/shelters/${id}`)
      .map(response => plainToClass(ShelterDto, response, { enableCircularCheck: false }));
  }

  list(query: ShelterListRequestDto): Observable<ShelterListResponseDto> {
    const params = new HttpParams()
      .set('offset', query.offset.toString())
      .set('limit', query.limit.toString());

    return this.http
      .get<ShelterListResponseDto>(`${environment.api}/api/shelters`, { params })
      .map(response => plainToClass(ShelterListResponseDto, response, { enableCircularCheck: false }));
  }
}
