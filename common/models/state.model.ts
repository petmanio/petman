import { Type } from 'class-transformer';

import { dtoGetter } from '../../server/services/util/util.service';
import { CountryDto } from './country.model';
import { CityDto } from './city.model';

export class StateDto {
  id: number;
  name: string;
  created: Date;
  updated: Date;

  countryId: number;
  @Type(dtoGetter(CountryDto))
  country: CountryDto;

  @Type(dtoGetter(CityDto))
  cities: CityDto[];
}
