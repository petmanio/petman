import { BelongsToMany, CreatedAt, DeletedAt, HasOne, Model, Table, UpdatedAt, } from 'sequelize-typescript';
import { extend } from 'lodash';

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
organization_service
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
    let obj = super.get({clone: true});
    obj = extend({}, obj, obj.i18n ? obj.i18n.toJSON() : {});
    delete obj.i18n;
    delete obj.deleted;
    delete obj.branch_service;
    delete obj.organization_service;
    return obj;
  }
}
