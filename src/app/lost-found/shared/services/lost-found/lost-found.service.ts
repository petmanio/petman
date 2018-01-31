import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { forEach } from 'lodash';

import { environment } from '../../../../../environments/environment';
import {
  LostFoundCreateRequestDto,
  LostFoundCreateResponseDto,
  LostFoundDeleteRequestDto,
  LostFoundDeleteResponseDto,
  LostFoundDto,
  LostFoundListRequestDto,
  LostFoundListResponseDto,
  LostFoundUpdateRequestDto,
  LostFoundUpdateResponseDto
} from '../../../../../../common/models/lost-found.model';

export interface ILostFoundService {
  create(body: LostFoundCreateRequestDto): Observable<LostFoundCreateResponseDto>;
  update(body: LostFoundUpdateRequestDto): Observable<LostFoundUpdateResponseDto>;
  delete(body: LostFoundDeleteRequestDto): Observable<LostFoundDeleteResponseDto>;
  getById(id: number): Observable<LostFoundDto>;
  list(query: LostFoundListRequestDto): Observable<LostFoundListResponseDto>;
}

@Injectable()
export class LostFoundService implements ILostFoundService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {}

  create(body: LostFoundCreateRequestDto): Observable<LostFoundCreateResponseDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      formData.append('type', body.type);
      forEach(body.images, file => formData.append('images', file, file.name));
    }
    return this.http.post<LostFoundCreateResponseDto>(`${environment.api}/api/lost-found`, formData).pipe(
      map(response => plainToClass(LostFoundCreateResponseDto, response, { enableCircularCheck: false }))
    );
  }

  update(body: LostFoundUpdateRequestDto): Observable<LostFoundUpdateResponseDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      formData.append('type', body.type);
      forEach(body.images, file => {
        if (typeof file === 'string') {
          formData.append('images', file);
        } else {
          formData.append('images', file, file.name);
        }
      });
    }
    return this.http.put<LostFoundUpdateResponseDto>(`${environment.api}/api/lost-found/${body.id}`, formData).pipe(
      map(response => plainToClass(LostFoundUpdateResponseDto, response, { enableCircularCheck: false }))
    );
  }

  delete(body: LostFoundDeleteRequestDto): Observable<LostFoundDeleteResponseDto> {
    return this.http.delete<LostFoundDeleteResponseDto>(`${environment.api}/api/lost-found/${body.id}`).pipe(
      map(response => plainToClass(LostFoundDeleteResponseDto, response, { enableCircularCheck: false }))
    );
  }

  getById(id: number): Observable<LostFoundDto> {
    return this.http
      .get<LostFoundDto>(`${environment.api}/api/lost-found/${id}`).pipe(
        map(response => plainToClass(LostFoundDto, response, { enableCircularCheck: false }))
      );
  }

  list(query: LostFoundListRequestDto): Observable<LostFoundListResponseDto> {
    const params = new HttpParams()
      .set('offset', query.offset.toString())
      .set('limit', query.limit.toString());

    return this.http
      .get<LostFoundListResponseDto>(`${environment.api}/api/lost-found`, { params }).pipe(
        map(response => plainToClass(LostFoundListResponseDto, response, { enableCircularCheck: false }))
      );
  }
}
