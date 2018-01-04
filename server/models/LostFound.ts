import { resolve } from 'url';
import {
  AllowNull, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { map } from 'lodash';

import config from '../config';
import { User } from './User';
import { LostFoundType } from '../../common/enums';

@Table({
  tableName: 'lost_found',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class LostFound extends Model<LostFound> {
  /**
   * Fields
   */
  @AllowNull(false)
  @Column({
    type: DataType.ENUM(LostFoundType.FOUND, LostFoundType.LOST)
  })
  type: LostFoundType;

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
