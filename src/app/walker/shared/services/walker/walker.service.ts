import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { plainToClass } from 'class-transformer';

import { environment } from '../../../../../environments/environment';
import {
  WalkerCreateRequestDto,
  WalkerCreateResponseDto,
  WalkerDeleteRequestDto,
  WalkerDeleteResponseDto,
  WalkerDto,
  WalkerListRequestDto,
  WalkerListResponseDto,
  WalkerUpdateRequestDto,
  WalkerUpdateResponseDto
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
  constructor(private http: HttpClient) {}

  create(body: WalkerCreateRequestDto): Observable<WalkerCreateResponseDto> {
    return this.http.post<WalkerCreateResponseDto>(`${environment.api}/api/walkers`, body)
      .map(response => plainToClass(WalkerCreateResponseDto, response, { enableCircularCheck: false }));
  }

  update(body: WalkerUpdateRequestDto): Observable<WalkerUpdateResponseDto> {
    return this.http.put<WalkerUpdateResponseDto>(`${environment.api}/api/walkers/${body.id}`, body)
      .map(response => plainToClass(WalkerUpdateResponseDto, response, { enableCircularCheck: false }));
  }

  delete(body: WalkerDeleteRequestDto): Observable<WalkerDeleteResponseDto> {
    return this.http.delete<WalkerDeleteResponseDto>(`${environment.api}/api/walkers/${body.id}`)
      .map(response => plainToClass(WalkerDeleteResponseDto, response, { enableCircularCheck: false }));
  }

  getById(id: number): Observable<WalkerDto> {
    return this.http
      .get<WalkerDto>(`${environment.api}/api/walkers/${id}`)
      .map(response => plainToClass(WalkerDto, response, { enableCircularCheck: false }));
  }

  list(query: WalkerListRequestDto): Observable<WalkerListResponseDto> {
    const params = new HttpParams()
      .set('offset', query.offset.toString())
      .set('limit', query.limit.toString());

    return this.http
      .get<WalkerListResponseDto>(`${environment.api}/api/walkers`, { params })
      .map(response => plainToClass(WalkerListResponseDto, response, { enableCircularCheck: false }));
  }
}
