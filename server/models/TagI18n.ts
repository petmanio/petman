import {
  AllowNull, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table,
  UpdatedAt
} from 'sequelize-typescript';

import { Tag } from './Tag';
import { Language } from '../../common/enums';

@Table({
  tableName: 'tag_i18n',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class TagI18n extends Model<TagI18n> {
  /**
   * Fields
   */
  @AllowNull(false)
  @Column(DataType.STRING(256))
  name: string;

  @Column({
    type: DataType.ENUM(Language.EN_US, Language.HY_AM)
  })
  language: Language;

  @Column({type: DataType.BOOLEAN, field: 'is_default'})
  isDefault: boolean;

  /**
   * Associations
   */
  @ForeignKey(() => Tag)
  @Column({field: 'tag_id'})
  tagId: number;

  @BelongsTo(() => Tag)
  tag: Tag;

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
