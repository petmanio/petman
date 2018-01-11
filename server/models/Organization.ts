import { resolve } from 'url';
import {
  AllowNull, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, ForeignKey, HasMany, Model, Table,
  UpdatedAt
} from 'sequelize-typescript';
import { map } from 'lodash';

import config from '../config';
import { User } from './User';
import { Service } from './Service';
import { Address } from './Address';
import { Branch } from './Branch';
import { Product } from './Product';

@Table({
  tableName: 'organization',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Organization extends Model<Organization> {
  /**
   * Fields
   */
  @AllowNull(false)
  @Column(DataType.STRING(150))
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.ARRAY(DataType.STRING(255)))
  images: string[];

  @Column(DataType.GEOMETRY)
  geometry: boolean;

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

  @BelongsToMany(() => Service, 'organization_service', 'organization_id', 'service_id')
  services: Service[];

  @HasMany(() => Branch)
  branches: Branch[];

  @HasMany(() => Product)
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
    obj.images = map(obj.images, path => resolve(config.host, 'upload' + path));
    delete obj.deleted;
    return obj;
  }
}
