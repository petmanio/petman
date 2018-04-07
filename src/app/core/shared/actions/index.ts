import { Action } from '@ngrx/store';

export const CLEAR = '[Main] Clear';

export class Clear implements Action {
  readonly type = CLEAR;

  constructor(public payload: string[]) {
  }
}

export type Actions = Clear;
