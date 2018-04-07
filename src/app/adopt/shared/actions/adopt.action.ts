import { Action } from '@ngrx/store';

import {
  AdoptCreateRequestDto,
  AdoptCreateResponseDto,
  AdoptDeleteRequestDto,
  AdoptDeleteResponseDto,
  AdoptDto,
  AdoptListRequestDto,
  AdoptListResponseDto,
  AdoptUpdateRequestDto,
  AdoptUpdateResponseDto
} from '../../../../../common/models/adopt.model';

export const CREATE = '[Adopt] Create';
export const CREATE_SUCCESS = '[Adopt] Create Success';
export const CREATE_FAILURE = '[Adopt] Create Failure';

export const UPDATE = '[Adopt] Update';
export const UPDATE_SUCCESS = '[Adopt] Update Success';
export const UPDATE_FAILURE = '[Adopt] Update Failure';

export const DELETE = '[Adopt] Delete';
export const DELETE_SUCCESS = '[Adopt] Delete Success';
export const DELETE_FAILURE = '[Adopt] Delete Failure';

export const LOAD = '[Adopt] Load';
export const LOAD_SUCCESS = '[Adopt] Load Success';
export const LOAD_FAILURE = '[Adopt] Load Failure';

export const LIST = '[Adopt] List';
export const LIST_SUCCESS = '[Adopt] List Success';
export const LIST_FAILURE = '[Adopt] List Failure';

export const MORE = '[Adopt] More';
export const MORE_SUCCESS = '[Adopt] More Success';
export const MORE_FAILURE = '[Adopt] More Failure';

export const SELECT = '[Adopt] Select';

/**
 * Create
 */
export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload: AdoptCreateRequestDto) {
  }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: AdoptCreateResponseDto) {
  }
}

export class CreateFailure implements Action {
  readonly type = CREATE_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * Update
 */
export class Update implements Action {
  readonly type = UPDATE;

  constructor(public payload: AdoptUpdateRequestDto) {
  }
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: AdoptUpdateResponseDto) {
  }
}

export class UpdateFailure implements Action {
  readonly type = UPDATE_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * Delete
 */
export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: AdoptDeleteRequestDto) {
  }
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: AdoptDeleteResponseDto) {
  }
}

export class DeleteFailure implements Action {
  readonly type = DELETE_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * Load
 */
export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: number) {
  }
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: AdoptDto) {
  }
}

export class LoadFailure implements Action {
  readonly type = LOAD_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * List
 */
export class List implements Action {
  readonly type = LIST;

  constructor(public payload: AdoptListRequestDto = null) {
  }
}

export class ListSuccess implements Action {
  readonly type = LIST_SUCCESS;

  constructor(public payload: AdoptListResponseDto) {
  }
}

export class ListFailure implements Action {
  readonly type = LIST_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * More
 */
export class More implements Action {
  readonly type = MORE;

  constructor(public payload: AdoptListRequestDto = null) {
  }
}

export class MoreSuccess implements Action {
  readonly type = MORE_SUCCESS;

  constructor(public payload: AdoptListResponseDto) {
  }
}

export class MoreFailure implements Action {
  readonly type = MORE_FAILURE;

  constructor(public payload: any) {
  }
}

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: number) {
  }
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
