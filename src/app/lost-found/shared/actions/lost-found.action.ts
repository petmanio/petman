import { Action } from '@ngrx/store';

import {
  LostFoundCreateRequestDto, LostFoundCreateResponseDto, LostFoundDeleteRequestDto, LostFoundDeleteResponseDto,
  LostFoundDto, LostFoundListRequestDto, LostFoundListResponseDto, LostFoundUpdateRequestDto, LostFoundUpdateResponseDto
} from '../../../../../common/models/lost-found.model';

export const CREATE = '[LostFound] Create';
export const CREATE_SUCCESS = '[LostFound] Create Success';
export const CREATE_FAILURE = '[LostFound] Create Failure';

export const UPDATE = '[LostFound] Update';
export const UPDATE_SUCCESS = '[LostFound] Update Success';
export const UPDATE_FAILURE = '[LostFound] Update Failure';

export const DELETE = '[LostFound] Delete';
export const DELETE_SUCCESS = '[LostFound] Delete Success';
export const DELETE_FAILURE = '[LostFound] Delete Failure';

export const LOAD = '[LostFound] Load';
export const LOAD_SUCCESS = '[LostFound] Load Success';
export const LOAD_FAILURE = '[LostFound] Load Failure';

export const LIST = '[LostFound] List';
export const LIST_SUCCESS = '[LostFound] List Success';
export const LIST_FAILURE = '[LostFound] List Failure';

export const MORE = '[LostFound] More';
export const MORE_SUCCESS = '[LostFound] More Success';
export const MORE_FAILURE = '[LostFound] More Failure';

export const SELECT = '[LostFound] Select';

/**
 * Create
 */
export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload: LostFoundCreateRequestDto) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: LostFoundCreateResponseDto) {}
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

  constructor(public payload: LostFoundUpdateRequestDto) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: LostFoundUpdateResponseDto) {}
}

export class UpdateFailure implements Action {
  readonly type = UPDATE_FAILURE;

  constructor(public payload: any) {}
}

/**
 * Delete
 */
export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: LostFoundDeleteRequestDto) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: LostFoundDeleteResponseDto) {}
}

export class DeleteFailure implements Action {
  readonly type = DELETE_FAILURE;

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

  constructor(public payload: LostFoundDto) {}
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

  constructor(public payload: LostFoundListRequestDto = null) {}
}

export class ListSuccess implements Action {
  readonly type = LIST_SUCCESS;

  constructor(public payload: LostFoundListResponseDto) {}
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

  constructor(public payload: LostFoundListRequestDto = null) {}
}

export class MoreSuccess implements Action {
  readonly type = MORE_SUCCESS;

  constructor(public payload: LostFoundListResponseDto) {}
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
  | Delete
  | DeleteSuccess
  | DeleteFailure
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
