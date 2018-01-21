import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

import { State } from './State';

@Table({
  tableName: 'country',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Country extends Model<Country> {
  /**
   * Fields
   */
  @AllowNull(false)
  @Column(DataType.STRING(3))
  sortname: string;

  @AllowNull(false)
  @Column(DataType.STRING(150))
  name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  phonecode: number;

  /**
   * Associations
   */
  @HasMany(() => State)
  states: State[];

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
    delete obj.created;
    delete obj.updated;
    delete obj.deleted;
    return obj;
  }
}
