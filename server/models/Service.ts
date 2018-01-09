import { CreatedAt, DeletedAt, HasOne, Model, Table, UpdatedAt, } from 'sequelize-typescript';

import { ServiceI18n } from './ServiceI18n';

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
