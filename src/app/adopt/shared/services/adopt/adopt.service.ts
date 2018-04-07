import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { forEach } from 'lodash';

import { environment } from '../../../../../environments/environment';
import {
  AdoptCreateRequestDto,
  AdoptCreateResponseDto,
  AdoptDeleteRequestDto,
  AdoptDeleteResponseDto,
  AdoptDto,
  AdoptListRequestDto,
  AdoptListResponseDto,
  AdoptUpdateRequestDto,
  AdoptUpdateResponseDto
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
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {
  }

  create(body: AdoptCreateRequestDto): Observable<AdoptCreateResponseDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      forEach(body.images, file => formData.append('images', file, file.name));
    }
    return this.http.post<AdoptCreateResponseDto>(`${environment.api}/api/adoption`, formData).pipe(
      map(response => plainToClass(AdoptCreateResponseDto, response, { enableCircularCheck: false }))
    );
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
    return this.http.put<AdoptUpdateResponseDto>(`${environment.api}/api/adoption/${body.id}`, formData).pipe(
      map(response => plainToClass(AdoptUpdateResponseDto, response, { enableCircularCheck: false }))
    );
  }

  delete(body: AdoptDeleteRequestDto): Observable<AdoptDeleteResponseDto> {
    return this.http.delete<AdoptDeleteResponseDto>(`${environment.api}/api/adoption/${body.id}`).pipe(
      map(response => plainToClass(AdoptDeleteResponseDto, response, { enableCircularCheck: false }))
    );
  }

  getById(id: number): Observable<AdoptDto> {
    return this.http
      .get<AdoptDto>(`${environment.api}/api/adoption/${id}`).pipe(
        map(response => plainToClass(AdoptDto, response, { enableCircularCheck: false }))
      );
  }

  list(query: AdoptListRequestDto): Observable<AdoptListResponseDto> {
    const params = new HttpParams()
      .set('offset', query.offset.toString())
      .set('limit', query.limit.toString());

    return this.http
      .get<AdoptListResponseDto>(`${environment.api}/api/adoption`, { params }).pipe(
        map(response => plainToClass(AdoptListResponseDto, response, { enableCircularCheck: false }))
      );
  }
}
