import {
  AllowNull, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { Geometry } from '../../common/shared';
import { State } from './State';
import { City } from './City';
import { Country } from './Country';

@Table({
  tableName: 'address',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Address extends Model<Address> {
  /**
   * Fields
   */
  @AllowNull(false)
  @Column({ type: DataType.STRING(255), field: 'line_1' })
  line1: string;

  @Column({ type: DataType.STRING(255), field: 'line_2' })
  line2: string;

  @Column({ type: DataType.STRING(255), field: 'line_3' })
  line3: string;

  @Column(DataType.GEOMETRY)
  geometry: Geometry;

  /**
   * Associations
   */
  @ForeignKey(() => City)
  @Column({field: 'city_id'})
  cityId: number;

  @BelongsTo(() => City)
  city: City;

  @ForeignKey(() => State)
  @Column({field: 'state_id'})
  stateId: number;

  @BelongsTo(() => State)
  state: State;

  @ForeignKey(() => Country)
  @Column({field: 'country_id'})
  countryId: number;

  @BelongsTo(() => Country)
  country: Country;

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
