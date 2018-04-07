import { Action } from '@ngrx/store';

export const SAMPLE = 'SAMPLE';

export class Sample implements Action {
  readonly type = SAMPLE;

  constructor(public payload: number) {
  }
}

export type Actions =
  | Sample;
