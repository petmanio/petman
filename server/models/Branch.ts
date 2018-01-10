import {
  AllowNull, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, Default, DeletedAt, ForeignKey, Model, Table,
  UpdatedAt
} from 'sequelize-typescript';

import { Service } from './Service';
import { Address } from './Address';
import { Company } from './Company';

@Table({
  tableName: 'branch',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Branch extends Model<Branch> {
  @AllowNull(false)
  @Column(DataType.STRING(255))
  name: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  main: boolean;

  @Column(DataType.GEOMETRY)
  geometry: boolean;

  /**
   * Associations
   */
  @ForeignKey(() => Company)
  @Column({field: 'company_id'})
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @ForeignKey(() => Address)
  @Column({field: 'address_id'})
  addressId: number;

  @BelongsTo(() => Address)
  address: Address;

  @BelongsToMany(() => Service, 'branch_service', 'branch_id', 'service_id')
  services: Service[];

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
