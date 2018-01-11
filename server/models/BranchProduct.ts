import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Branch } from './Branch';
import { Product } from './Product';

@Table({
  tableName: 'branch_product',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class BranchProduct extends Model<BranchProduct> {
  /**
   * Fields
   */
  @Column(DataType.DECIMAL)
  price: number;

  @Column(DataType.INTEGER)
  quantity: number;

  /**
   * Associations
   */
  @ForeignKey(() => Branch)
  @Column({field: 'branch_id'})
  branchId: number;

  @ForeignKey(() => Product)
  @Column({field: 'product_id'})
  productId: number;

  /**
   * Instance methods
   */
  toJSON() {
    const obj = super.get({clone: true});
    delete obj.deleted;
    return obj;
  }
}
