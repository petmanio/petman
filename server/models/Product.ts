import {
  AllowNull, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table,
  UpdatedAt
} from 'sequelize-typescript';

import { UnitType } from '../../common/enums';
import { Branch } from './Branch';
import { Company } from './Company';
import { BranchProduct } from './BranchProduct';
import { Category } from './Category';

@Table({
  tableName: 'product',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Product extends Model<Product> {
  /**
   * Fields
   */
  @AllowNull(false)
  @Column(DataType.STRING(150))
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column({field: 'base_price', type: DataType.FLOAT})
  basePrice: number;

  @Column(DataType.ENUM(UnitType.KG, UnitType.ITEM))
  unit: UnitType;

  @Column(DataType.ARRAY(DataType.STRING(255)))
  images: string[];

  /**
   * Associations
   */
  @ForeignKey(() => Company)
  @Column({field: 'company_id'})
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsToMany(() => Branch, () => BranchProduct)
  branches: Branch[];

  @BelongsToMany(() => Product, 'product_category', 'product_id', 'category_id')
  categories: Category[];

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
