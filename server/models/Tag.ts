import { BelongsToMany, CreatedAt, DeletedAt, HasOne, Model, Table, UpdatedAt, } from 'sequelize-typescript';

import { Post } from './Post';
import { TagI18n } from './TagI18n';

@Table({
  tableName: 'tag',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Tag extends Model<Tag> {
  /**
   * Associations
   */
  @HasOne(() => TagI18n)
  i18n: TagI18n;

  @BelongsToMany(() => Post, 'post_tag', 'tag_id', 'post_id')
  posts: Post[];

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
