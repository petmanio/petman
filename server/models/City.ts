import {
  AllowNull, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { State } from './State';

@Table({
  tableName: 'city',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class City extends Model<City> {
  @AllowNull(false)
  @Column(DataType.STRING(30))
  name: string;

  /**
   * Associations
   */

  @ForeignKey(() => State)
  @Column({field: 'state_id'})
  stateId: number;

  @BelongsTo(() => State)
  state: State;

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
