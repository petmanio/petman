import { BelongsToMany, CreatedAt, DeletedAt, HasOne, Model, Table, UpdatedAt, } from 'sequelize-typescript';

import { CategoryI18n } from './CategoryI18n';
import { Product } from './Product';

@Table({
  tableName: 'category',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Category extends Model<Category> {
  /**
   * Fields
   */

  /**
   * Associations
   */
  @HasOne(() => CategoryI18n)
  i18n: CategoryI18n;

  @BelongsToMany(() => Product, 'product_category', 'category_id', 'product_id')
  products: Product[];

  /**
   * Defaults
   */
  @CreatedAt
  created: Date;

  @UpdatedAt
  updated: Date;

  @DeletedAt
  deleted: Date;

  /**
   * Instance methods
   */
  toJSON() {
    const obj = super.get({clone: true});
    delete obj.deleted;
    return obj;
  }
}
