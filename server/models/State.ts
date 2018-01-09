import {
  AllowNull, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, HasMany, Model, Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { Country } from './Country';
import { City } from './City';

@Table({
  tableName: 'state',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class State extends Model<State> {
  @AllowNull(false)
  @Column(DataType.STRING(30))
  name: string;

  /**
   * Associations
   */
  @ForeignKey(() => Country)
  @Column({field: 'country_id'})
  countryId: number;

  @BelongsTo(() => Country)
  country: Country;

  @HasMany(() => City)
  cities: City[];

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
