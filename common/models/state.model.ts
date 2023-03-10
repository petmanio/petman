import { Type } from 'class-transformer';

import { dtoGetter } from '../lib/util';
import { CountryDto } from './country.model';
import { CityDto } from './city.model';

export class StateDto {
  id: number;
  name: string;

  countryId: number;
  @Type(dtoGetter(CountryDto))
  country: CountryDto;

  @Type(dtoGetter(CityDto))
  cities: CityDto[];
}
