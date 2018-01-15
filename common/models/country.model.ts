import { Type } from 'class-transformer';

import { dtoGetter } from '../../server/services/util/util.service';
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
