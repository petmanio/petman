import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

import { Service } from './Service';
import { Language } from '../../common/enums';

@Table({
  tableName: 'service_i18n',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class ServiceI18n extends Model<ServiceI18n> {
  /**
   * Fields
   */
  @AllowNull(false)
  @Column(DataType.STRING(150))
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column({
    type: DataType.ENUM(Language.EN_US, Language.HY_AM)
  })
  language: Language;

  @Column({type: DataType.BOOLEAN, field: 'is_default'})
  isDefault: boolean;

  /**
   * Associations
   */
  @ForeignKey(() => Service)
  @Column({field: 'service_id'})
  serviceId: number;

  @BelongsTo(() => Service)
  service: Service;

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
