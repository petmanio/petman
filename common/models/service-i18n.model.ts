import { Type } from 'class-transformer';

import { dtoGetter } from '../lib/util';
import { Language } from '../enums';
import { ServiceDto } from './service.model';

export class ServiceI18nDto {
  id: number;
  title: string;
  description: string;
  language: Language;
  isDefault: boolean;
  created: Date;
  updated: Date;

  @Type(dtoGetter(ServiceDto))
  service: ServiceDto;
}
