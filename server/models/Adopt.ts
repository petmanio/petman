import { map } from 'lodash';
import {
  AllowNull, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { resolve } from 'url';

import config from '../config';
import { User } from './User';

@Table({
  tableName: 'adopt',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Adopt extends Model<Adopt> {
  /**
   * Fields
   */
  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING(256)))
  images: string[];
  /**
   * Associations
   */
  @ForeignKey(() => User)
  @Column({field: 'user_id'})
  userId: number;

  @BelongsTo(() => User)
  user: User;

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
    obj.images = map(obj.images, path => resolve(config.host, 'upload' + path));
    delete obj.deleted;
    return obj;
  }
}
