import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { isArray } from 'lodash';

import { environment } from '../../../../../environments/environment';
import {
  OrganizationDto,
  OrganizationListRequestDto,
  OrganizationListResponseDto,
  OrganizationPinsRequestDto,
  OrganizationPinsResponseDto
} from '../../../../../../common/models/organization.model';

export interface IOrganizationService {
  getById(id: number): Observable<OrganizationDto>;
  list(query: OrganizationListRequestDto): Observable<OrganizationListResponseDto>;
  pins(query: OrganizationPinsRequestDto): Observable<OrganizationPinsResponseDto>;
}

@Injectable()
export class OrganizationService implements IOrganizationService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {}

  getById(id: number): Observable<OrganizationDto> {
    return this.http
      .get<OrganizationDto>(`${environment.api}/api/organizations/${id}`).pipe(
        map(response => plainToClass(OrganizationDto, response, { enableCircularCheck: false }))
      );
  }

  list(query: OrganizationListRequestDto): Observable<OrganizationListResponseDto> {
    let params = new HttpParams()
      .set('offset', query.offset.toString())
      .set('limit', query.limit.toString());

    if (query.service) {
      (isArray(query.service) ? query.service : [query.service]).forEach(svc => params = params.append('service', svc.toString()));
    }

    return this.http
      .get<OrganizationListResponseDto>(`${environment.api}/api/organizations`, { params }).pipe(
        map(response => plainToClass(OrganizationListResponseDto, response, { enableCircularCheck: false }))
      );
  }

  pins(query: OrganizationPinsRequestDto): Observable<OrganizationPinsResponseDto> {
    let params = new HttpParams();

    if (query.service) {
      (isArray(query.service) ? query.service : [query.service]).forEach(svc => params = params.append('service', svc.toString()));
    }

    return this.http
      .get<OrganizationPinsResponseDto>(`${environment.api}/api/organizations/pins`, { params }).pipe(
        map(response => plainToClass(OrganizationPinsResponseDto, response, { enableCircularCheck: false }))
      );
  }
}
