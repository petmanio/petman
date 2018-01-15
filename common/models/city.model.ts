import { Type } from 'class-transformer';

import { dtoGetter } from '../../server/services/util/util.service';
import { StateDto } from './state.model';

export class CityDto {
  id: number;
  name: string;
  created: Date;
  updated: Date;

  stateId: number;
  @Type(dtoGetter(StateDto))
  state: StateDto;
}
