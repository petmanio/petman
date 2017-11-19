import { Action } from '@ngrx/store';
import { ShelterDto } from '../../../../../common/models/shelter.model';

export const LIST = '[Shelter] List';
export const LIST_SUCCESS = '[Shelter] List Success';
export const LIST_FAILURE = '[Shelter] List Failure';

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
  | List
  | ListSuccess
  | ListFailure;
