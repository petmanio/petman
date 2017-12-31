import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { plainToClass } from 'class-transformer';
import { forEach } from 'lodash';

import { environment } from '../../../../../environments/environment';
import {
  WalkerCreateRequestDto, WalkerCreateResponseDto, WalkerDeleteRequestDto, WalkerDeleteResponseDto,
  WalkerDto, WalkerListRequestDto, WalkerListResponseDto, WalkerUpdateRequestDto, WalkerUpdateResponseDto
} from '../../../../../../common/models/walker.model';

export interface IWalkerService {
  create(body: WalkerCreateRequestDto): Observable<WalkerCreateResponseDto>;
  update(body: WalkerUpdateRequestDto): Observable<WalkerUpdateResponseDto>;
  delete(body: WalkerDeleteRequestDto): Observable<WalkerDeleteResponseDto>;
  getById(id: number): Observable<WalkerDto>;
  list(query: WalkerListRequestDto): Observable<WalkerListResponseDto>;
}

@Injectable()
export class WalkerService implements IWalkerService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {}

  create(body: WalkerCreateRequestDto): Observable<WalkerCreateResponseDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      formData.append('price', body.price);
      forEach(body.images, file => formData.append('images', file, file.name));
    }
    return this.http.post<WalkerCreateResponseDto>(`${environment.apiEndpoint}/api/walkers`, formData)
      .map(response => plainToClass(WalkerCreateResponseDto, response, { enableCircularCheck: false }));
  }

  update(body: WalkerUpdateRequestDto): Observable<WalkerUpdateResponseDto> {
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
    return this.http.put<WalkerUpdateResponseDto>(`${environment.apiEndpoint}/api/walkers/${body.id}`, formData)
      .map(response => plainToClass(WalkerUpdateResponseDto, response, { enableCircularCheck: false }));
  }

  delete(body: WalkerDeleteRequestDto): Observable<WalkerDeleteResponseDto> {
    return this.http.delete<WalkerDeleteResponseDto>(`${environment.apiEndpoint}/api/walkers/${body.id}`)
      .map(response => plainToClass(WalkerDeleteResponseDto, response, { enableCircularCheck: false }));
  }

  getById(id: number): Observable<WalkerDto> {
    return this.http
      .get<WalkerDto>(`${environment.apiEndpoint}/api/walkers/${id}`)
      .map(response => plainToClass(WalkerDto, response, { enableCircularCheck: false }));
  }

  list(query: WalkerListRequestDto): Observable<WalkerListResponseDto> {
    const params = new HttpParams()
      .set('offset', query.offset.toString())
      .set('limit', query.limit.toString());

    return this.http
      .get<WalkerListResponseDto>(`${environment.apiEndpoint}/api/walkers`, { params })
      .map(response => plainToClass(WalkerListResponseDto, response, { enableCircularCheck: false }));
  }
}
