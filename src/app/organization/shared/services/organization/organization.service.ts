import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { plainToClass } from 'class-transformer';

import { environment } from '../../../../../environments/environment';
import {
  OrganizationDto, OrganizationListRequestDto,
  OrganizationListResponseDto
} from '../../../../../../common/models/organization.model';

export interface IOrganizationService {
  getById(id: number): Observable<OrganizationDto>;
  list(query: OrganizationListRequestDto): Observable<OrganizationListResponseDto>;
}

@Injectable()
export class OrganizationService implements IOrganizationService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {}

  getById(id: number): Observable<OrganizationDto> {
    return this.http
      .get<OrganizationDto>(`${environment.api}/api/organizations/${id}`)
      .map(response => plainToClass(OrganizationDto, response, { enableCircularCheck: false }));
  }

  list(query: OrganizationListRequestDto): Observable<OrganizationListResponseDto> {
    const params = new HttpParams()
      .set('offset', query.offset.toString())
      .set('limit', query.limit.toString());

    return this.http
      .get<OrganizationListResponseDto>(`${environment.api}/api/organizations`, { params })
      .map(response => plainToClass(OrganizationListResponseDto, response, { enableCircularCheck: false }));
  }
}
