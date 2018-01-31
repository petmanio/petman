import { Action } from '@ngrx/store';

import { ServiceListRequestDto, ServiceListResponseDto } from '../../../../common/models/service.model';


export const SERVICE_LIST = '[Service] List';
export const SERVICE_LIST_SUCCESS = '[Service] List Success';
export const SERVICE_LIST_FAILURE = '[Service] List Failure';

/**
 * Service list
 */
export class ServiceList implements Action {
  readonly type = SERVICE_LIST;

  constructor(public payload: ServiceListRequestDto = null) {}
}

export class ServiceListSuccess implements Action {
  readonly type = SERVICE_LIST_SUCCESS;

  constructor(public payload: ServiceListResponseDto) {}
}

export class ServiceListFailure implements Action {
  readonly type = SERVICE_LIST_FAILURE;

  constructor(public payload: any) {}
}

export type Actions =
  | ServiceList
  | ServiceListSuccess
  | ServiceListFailure;
