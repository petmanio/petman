import {
  AllowNull, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table,
  UpdatedAt
} from 'sequelize-typescript';

import { Category } from './Category';
import { Language } from '../../common/enums';

@Table({
  tableName: 'category_i18n',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class CategoryI18n extends Model<CategoryI18n> {
  /**
   * Fields
   */
  @AllowNull(false)
  @Column(DataType.STRING(150))
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column({
    type: DataType.ENUM(Language.EN_US, Language.HY_AM)
  })
  language: Language;

  @Column({type: DataType.BOOLEAN, field: 'is_default'})
  isDefault: boolean;

  /**
   * Associations
   */
  @ForeignKey(() => Category)
  @Column({field: 'category_id'})
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

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
