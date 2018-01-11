import { BelongsToMany, CreatedAt, DeletedAt, HasOne, Model, Table, UpdatedAt, } from 'sequelize-typescript';

import { ServiceI18n } from './ServiceI18n';
import { Organization } from './Organization';
import { Branch } from './Branch';

@Table({
  tableName: 'service',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Service extends Model<Service> {
  /**
   * Fields
   */

  /**
   * Associations
   */
  @HasOne(() => ServiceI18n)
  i18n: ServiceI18n;

  @BelongsToMany(() => Organization, 'organization_service', 'service_id', 'organization_id')
  organizations: Organization[];

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
