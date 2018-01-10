import { BelongsToMany, CreatedAt, DeletedAt, HasOne, Model, Table, UpdatedAt, } from 'sequelize-typescript';

import { ServiceI18n } from './ServiceI18n';
import { Company } from './Company';
import { Branch } from './Branch';

@Table({
  tableName: 'service',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Service extends Model<Service> {
  /**
   * Associations
   */
  @HasOne(() => ServiceI18n)
  i18n: ServiceI18n;

  @BelongsToMany(() => Company, 'company_service', 'service_id', 'company_id')
  companies: Company[];

  @BelongsToMany(() => Branch, 'branch_service', 'service_id', 'branch_id')
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
