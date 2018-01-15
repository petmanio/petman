import { Type } from 'class-transformer';

import { dtoGetter } from '../../server/services/util/util.service';
import { CityDto } from './city.model';
import { StateDto } from './state.model';
import { CountryDto } from './country.model';

export class AddressDto {
  id: number;
  line1: string;
  line2: string;
  line3: string;
  geometry: number[];
  created: Date;
  updated: Date;

  cityId: number;
  @Type(dtoGetter(CityDto))
  city: CityDto;

  stateId: number;
  @Type(dtoGetter(StateDto))
  state: StateDto;

  countryId: number;
  @Type(dtoGetter(CountryDto))
  country: CountryDto;
}
