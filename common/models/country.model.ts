import { Type } from 'class-transformer';

import { dtoGetter } from '../lib/util';
import { StateDto } from './state.model';

export class CountryDto {
  id: number;
  sortname: string;
  name: string;
  phonecode: number;

  @Type(dtoGetter(StateDto))
  states: StateDto[];
}
