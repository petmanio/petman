import { resolve } from 'url';
import {
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
import { map } from 'lodash';

import config from '../config';
import { User } from './User';

@Table({
  tableName: 'shelter',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Shelter extends Model<Shelter> {
  /**
   * Fields
   */
  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.FLOAT)
  price: number;

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
    obj.images = map(obj.images, path => resolve(config.host, 'upload' + path))
    delete obj.deleted;
    return obj;
  }
}
