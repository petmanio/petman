import { Type } from 'class-transformer';

import { dtoGetter } from '../lib/util';
import { Language } from '../enums';
import { CategoryDto } from './category.model';

export class CategoryI18nDto {
  id: number;
  title: string;
  description: string;
  language: Language;
  isDefault: boolean;
  created: Date;
  updated: Date;

  @Type(dtoGetter(CategoryDto))
  category: CategoryDto;
}
