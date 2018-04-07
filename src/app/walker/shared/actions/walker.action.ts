import { Action } from '@ngrx/store';

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
} from '../../../../../common/models/walker.model';

export const CREATE = '[Walker] Create';
export const CREATE_SUCCESS = '[Walker] Create Success';
export const CREATE_FAILURE = '[Walker] Create Failure';

export const UPDATE = '[Walker] Update';
export const UPDATE_SUCCESS = '[Walker] Update Success';
export const UPDATE_FAILURE = '[Walker] Update Failure';

export const DELETE = '[Walker] Delete';
export const DELETE_SUCCESS = '[Walker] Delete Success';
export const DELETE_FAILURE = '[Walker] Delete Failure';

export const LOAD = '[Walker] Load';
export const LOAD_SUCCESS = '[Walker] Load Success';
export const LOAD_FAILURE = '[Walker] Load Failure';

export const LIST = '[Walker] List';
export const LIST_SUCCESS = '[Walker] List Success';
export const LIST_FAILURE = '[Walker] List Failure';

export const MORE = '[Walker] More';
export const MORE_SUCCESS = '[Walker] More Success';
export const MORE_FAILURE = '[Walker] More Failure';

export const SELECT = '[Walker] Select';

/**
 * Create
 */
export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload: WalkerCreateRequestDto) {
  }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: WalkerCreateResponseDto) {
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

  constructor(public payload: WalkerUpdateRequestDto) {
  }
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: WalkerUpdateResponseDto) {
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

  constructor(public payload: WalkerDeleteRequestDto) {
  }
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: WalkerDeleteResponseDto) {
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

  constructor(public payload: WalkerDto) {
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

  constructor(public payload: WalkerListRequestDto = null) {
  }
}

export class ListSuccess implements Action {
  readonly type = LIST_SUCCESS;

  constructor(public payload: WalkerListResponseDto) {
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

  constructor(public payload: WalkerListRequestDto = null) {
  }
}

export class MoreSuccess implements Action {
  readonly type = MORE_SUCCESS;

  constructor(public payload: WalkerListResponseDto) {
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
