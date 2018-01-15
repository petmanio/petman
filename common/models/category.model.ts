import { Type } from 'class-transformer';

import { dtoGetter } from '../../server/services/util/util.service';
import { ProductDto } from './product.model';
import { CategoryI18nDto } from './category-i18n.model';

export class CategoryDto {
  created: Date;
  updated: Date;

  @Type(dtoGetter(CategoryI18nDto))
  i18n: CategoryI18nDto;

  @Type(dtoGetter(ProductDto))
  products: ProductDto[];
}
