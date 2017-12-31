import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { plainToClass } from 'class-transformer';
import { forEach } from 'lodash';

import { environment } from '../../../../../environments/environment';
import {
  AdoptCreateRequestDto, AdoptCreateResponseDto, AdoptDeleteRequestDto, AdoptDeleteResponseDto, AdoptDto,
  AdoptListRequestDto, AdoptListResponseDto, AdoptUpdateRequestDto, AdoptUpdateResponseDto
} from '../../../../../../common/models/adopt.model';

export interface IAdoptService {
  create(body: AdoptCreateRequestDto): Observable<AdoptCreateResponseDto>;
  update(body: AdoptUpdateRequestDto): Observable<AdoptUpdateResponseDto>;
  delete(body: AdoptDeleteRequestDto): Observable<AdoptDeleteResponseDto>;
  getById(id: number): Observable<AdoptDto>;
  list(query: AdoptListRequestDto): Observable<AdoptListResponseDto>;
}

@Injectable()
export class AdoptService implements IAdoptService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {}

  create(body: AdoptCreateRequestDto): Observable<AdoptCreateResponseDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      forEach(body.images, file => formData.append('images', file, file.name));
    }
    return this.http.post<AdoptCreateResponseDto>(`${environment.apiEndpoint}/api/adoption`, formData)
      .map(response => plainToClass(AdoptCreateResponseDto, response, { enableCircularCheck: false }));
  }

  update(body: AdoptUpdateRequestDto): Observable<AdoptUpdateResponseDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      forEach(body.images, file => {
        if (typeof file === 'string') {
          formData.append('images', file);
        } else {
          formData.append('images', file, file.name);
        }
      });
    }
    return this.http.put<AdoptUpdateResponseDto>(`${environment.apiEndpoint}/api/adoption/${body.id}`, formData)
      .map(response => plainToClass(AdoptUpdateResponseDto, response, { enableCircularCheck: false }));
  }

  delete(body: AdoptDeleteRequestDto): Observable<AdoptDeleteResponseDto> {
    return this.http.delete<AdoptDeleteResponseDto>(`${environment.apiEndpoint}/api/adoption/${body.id}`)
      .map(response => plainToClass(AdoptDeleteResponseDto, response, { enableCircularCheck: false }));
  }

  getById(id: number): Observable<AdoptDto> {
    return this.http
      .get<AdoptDto>(`${environment.apiEndpoint}/api/adoption/${id}`)
      .map(response => plainToClass(AdoptDto, response, { enableCircularCheck: false }));
  }

  list(query: AdoptListRequestDto): Observable<AdoptListResponseDto> {
    const params = new HttpParams()
      .set('offset', query.offset.toString())
      .set('limit', query.limit.toString());

    return this.http
      .get<AdoptListResponseDto>(`${environment.apiEndpoint}/api/adoption`, { params })
      .map(response => plainToClass(AdoptListResponseDto, response, { enableCircularCheck: false }));
  }
}
