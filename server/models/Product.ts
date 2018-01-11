import {
  AllowNull, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, Model, Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Branch } from './Branch';
import { UnitType } from '../../common/enums';
import { Company } from './Company';

@Table({
  tableName: 'product',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Product extends Model<Product> {
  @AllowNull(false)
  @Column(DataType.STRING(255))
  name: string;

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
  @BelongsToMany(() => Branch, 'branch_product', 'product_id', 'branch_id')
  branches: Branch[];

  @BelongsToMany(() => Company, 'company_product', 'product_id', 'company_id')
  companies: Company[];

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
