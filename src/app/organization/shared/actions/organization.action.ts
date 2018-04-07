import { Action } from '@ngrx/store';

import {
  OrganizationDto,
  OrganizationListRequestDto,
  OrganizationListResponseDto,
  OrganizationPinsRequestDto,
  OrganizationPinsResponseDto,
} from '../../../../../common/models/organization.model';

export const LOAD = '[Organization] Load';
export const LOAD_SUCCESS = '[Organization] Load Success';
export const LOAD_FAILURE = '[Organization] Load Failure';

export const LIST = '[Organization] List';
export const LIST_SUCCESS = '[Organization] List Success';
export const LIST_FAILURE = '[Organization] List Failure';

export const MORE = '[Organization] More';
export const MORE_SUCCESS = '[Organization] More Success';
export const MORE_FAILURE = '[Organization] More Failure';

export const PINS = '[Organization] Pins';
export const PINS_SUCCESS = '[Organization] Pins Success';
export const PINS_FAILURE = '[Organization] Pins Failure';

export const SELECT = '[Organization] Select';

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

  constructor(public payload: OrganizationDto) {
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

  constructor(public payload: OrganizationListRequestDto = null) {
  }
}

export class ListSuccess implements Action {
  readonly type = LIST_SUCCESS;

  constructor(public payload: OrganizationListResponseDto) {
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

  constructor(public payload: OrganizationListRequestDto = null) {
  }
}

export class MoreSuccess implements Action {
  readonly type = MORE_SUCCESS;

  constructor(public payload: OrganizationListResponseDto) {
  }
}

export class MoreFailure implements Action {
  readonly type = MORE_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * Pins
 */
export class Pins implements Action {
  readonly type = PINS;

  constructor(public payload: OrganizationPinsRequestDto = null) {
  }
}

export class PinsSuccess implements Action {
  readonly type = PINS_SUCCESS;

  constructor(public payload: OrganizationPinsResponseDto) {
  }
}

export class PinsFailure implements Action {
  readonly type = PINS_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * Select
 */
export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: number) {
  }
}

export type Actions =
  | Load
  | LoadSuccess
  | LoadFailure
  | List
  | ListSuccess
  | ListFailure
  | More
  | MoreSuccess
  | MoreFailure
  | Pins
  | PinsSuccess
  | PinsFailure
  | Select;
