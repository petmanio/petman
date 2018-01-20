import { Type } from 'class-transformer';

import { dtoGetter } from '../lib/util';
import { StateDto } from './state.model';

export class CityDto {
  id: number;
  name: string;

  stateId: number;
  @Type(dtoGetter(StateDto))
  state: StateDto;
}
