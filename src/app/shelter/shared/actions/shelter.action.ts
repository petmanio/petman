import { Action } from '@ngrx/store';

import {
  ShelterCreateRequestDto,
  ShelterCreateResponseDto,
  ShelterDto
} from '../../../../../common/models/shelter.model';

export const CREATE = '[Shelter] Create';
export const CREATE_SUCCESS = '[Shelter] Create Success';
export const CREATE_FAILURE = '[Shelter] Create Failure';

export const LIST = '[Shelter] List';
export const LIST_SUCCESS = '[Shelter] List Success';
export const LIST_FAILURE = '[Shelter] List Failure';

/**
 * Create
 */
export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload: ShelterCreateRequestDto) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: ShelterCreateResponseDto) {}
}

export class CreateFailure implements Action {
  readonly type = CREATE_FAILURE;

  constructor(public payload: any) {}
}

/**
 * List
 */
export class List implements Action {
  readonly type = LIST;

  constructor(public payload: any = null) {}
}

export class ListSuccess implements Action {
  readonly type = LIST_SUCCESS;

  constructor(public payload: ShelterDto) {}
}

export class ListFailure implements Action {
  readonly type = LIST_FAILURE;

  constructor(public payload: any) {}
}

export type Actions =
  | Create
  | CreateSuccess
  | CreateFailure
  | List
  | ListSuccess
  | ListFailure;
