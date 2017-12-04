import { Action } from '@ngrx/store';

import {
  ShelterCreateRequestDto,
  ShelterCreateResponseDto,
  ShelterListRequestDto,
  ShelterListResponseDto
} from '../../../../../common/models/shelter.model';

export const CREATE = '[Shelter] Create';
export const CREATE_SUCCESS = '[Shelter] Create Success';
export const CREATE_FAILURE = '[Shelter] Create Failure';

export const LIST = '[Shelter] List';
export const LIST_SUCCESS = '[Shelter] List Success';
export const LIST_FAILURE = '[Shelter] List Failure';

export const MORE = '[Shelter] More';
export const MORE_SUCCESS = '[Shelter] More Success';
export const MORE_FAILURE = '[Shelter] More Failure';

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

  constructor(public payload: ShelterListRequestDto = null) {}
}

export class ListSuccess implements Action {
  readonly type = LIST_SUCCESS;

  constructor(public payload: ShelterListResponseDto) {}
}

export class ListFailure implements Action {
  readonly type = LIST_FAILURE;

  constructor(public payload: any) {}
}

/**
 * More
 */
export class More implements Action {
  readonly type = MORE;

  constructor(public payload: ShelterListRequestDto = null) {}
}

export class MoreSuccess implements Action {
  readonly type = MORE_SUCCESS;

  constructor(public payload: ShelterListResponseDto) {}
}

export class MoreFailure implements Action {
  readonly type = MORE_FAILURE;

  constructor(public payload: any) {}
}

export type Actions =
  | Create
  | CreateSuccess
  | CreateFailure
  | List
  | ListSuccess
  | ListFailure
  | More
  | MoreSuccess
  | MoreFailure;
