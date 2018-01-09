import { resolve } from 'url';
import {
  AllowNull, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { map } from 'lodash';

import config from '../config';
import { User } from './User';
import { Tag } from './Tag';

@Table({
  tableName: 'post',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Post extends Model<Post> {
  /**
   * Fields
   */
  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.ARRAY(DataType.STRING(255)))
  images: string[];

  /**
   * Associations
   */
  @ForeignKey(() => User)
  @Column({field: 'user_id'})
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Tag, 'post_tag', 'post_id')
  tags: Tag[];

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
