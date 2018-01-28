import { Type } from 'class-transformer';

import { dtoGetter } from '../lib/util';
import { Geometry } from '../shared';
import { CityDto } from './city.model';
import { StateDto } from './state.model';
import { CountryDto } from './country.model';

export class AddressDto {
  id: number;
  line1: string;
  line2: string;
  line3: string;
  geometry: Geometry;
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

  fullAddressHTML?(): string {
    return `
      ${this.country ? this.country.name : ''}&nbsp;
      ${this.state ? this.state.name : ''}&nbsp;
      ${this.city ? this.city.name : ''}&nbsp;
      ${this.line1 || ''}&nbsp;
      ${this.line2 || ''}&nbsp;
      ${this.line3 || ''}&nbsp;
    `;
  }
}
