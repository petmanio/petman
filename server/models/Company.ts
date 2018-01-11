import {
  AllowNull, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, ForeignKey, HasMany, HasOne, Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

import { User } from './User';
import { Service } from './Service';
import { Address } from './Address';
import { Branch } from './Branch';
import { Product } from './Product';

@Table({
  tableName: 'company',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Company extends Model<Company> {
  @AllowNull(false)
  @Column(DataType.STRING(255))
  name: string;

  @Column(DataType.ARRAY(DataType.STRING(255)))
  images: string[];

  /**
   * Associations
   */
  @ForeignKey(() => User)
  @Column({field: 'user_id'})
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Address)
  @Column({field: 'address_id'})
  addressId: number;

  @BelongsTo(() => Address)
  address: Address;

  @BelongsToMany(() => Service, 'company_service', 'company_id', 'service_id')
  services: Service[];

  @BelongsToMany(() => Product, 'company_product', 'company_id', 'product_id')
  products: Product[];

  @HasMany(() => Branch)
  branches: Branch[];
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
