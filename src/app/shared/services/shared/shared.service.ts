import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { isArray } from 'lodash';

import { environment } from '../../../../environments/environment';
import { ServiceListRequestDto, ServiceListResponseDto } from '../../../../../common/models/service.model';

export interface ISharedService {
  serviceList(query: ServiceListRequestDto): Observable<ServiceListResponseDto>;
}

@Injectable()
export class SharedService implements ISharedService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {}

  serviceList(query: ServiceListRequestDto): Observable<ServiceListResponseDto> {
    return this.http
      .get<ServiceListResponseDto>(`${environment.api}/api/services`).pipe(
        map(response => plainToClass(ServiceListResponseDto, response, { enableCircularCheck: false }))
      );
  }
}
