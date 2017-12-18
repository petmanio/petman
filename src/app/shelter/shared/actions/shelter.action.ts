import { Action } from '@ngrx/store';

import {
  ShelterCreateRequestDto, ShelterCreateResponseDto, ShelterDto, ShelterListRequestDto, ShelterListResponseDto,
  ShelterUpdateResponseDto
} from '../../../../../common/models/shelter.model';

export const CREATE = '[Shelter] Create';
export const CREATE_SUCCESS = '[Shelter] Create Success';
export const CREATE_FAILURE = '[Shelter] Create Failure';

export const UPDATE = '[Shelter] Update';
export const UPDATE_SUCCESS = '[Shelter] Update Success';
export const UPDATE_FAILURE = '[Shelter] Update Failure';

export const LOAD = '[Shelter] Load';
export const LOAD_SUCCESS = '[Shelter] Load Success';
export const LOAD_FAILURE = '[Shelter] Load Failure';

export const LIST = '[Shelter] List';
export const LIST_SUCCESS = '[Shelter] List Success';
export const LIST_FAILURE = '[Shelter] List Failure';

export const MORE = '[Shelter] More';
export const MORE_SUCCESS = '[Shelter] More Success';
export const MORE_FAILURE = '[Shelter] More Failure';

export const SELECT = '[Shelter] Select';

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
 * Update
 */
export class Update implements Action {
  readonly type = UPDATE;

  constructor(public payload: ShelterCreateRequestDto) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: ShelterUpdateResponseDto) {}
}

export class UpdateFailure implements Action {
  readonly type = UPDATE_FAILURE;

  constructor(public payload: any) {}
}

/**
 * Load
 */
export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: number) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: ShelterDto) {}
}

export class LoadFailure implements Action {
  readonly type = LOAD_FAILURE;

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

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: number) {}
}

export type Actions =
  | Create
  | CreateSuccess
  | CreateFailure
  | Update
  | UpdateSuccess
  | UpdateFailure
  | Load
  | LoadSuccess
  | LoadFailure
  | List
  | ListSuccess
  | ListFailure
  | More
  | MoreSuccess
  | MoreFailure
  | Select;
