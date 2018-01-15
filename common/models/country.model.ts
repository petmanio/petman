import { Type } from 'class-transformer';

import { dtoGetter } from '../lib/util';
import { StateDto } from './state.model';

export class CountryDto {
  id: number;
  sortname: string;
  name: string;
  phonecode: number;
  created: Date;
  updated: Date;

  @Type(dtoGetter(StateDto))
  states: StateDto[];
}
