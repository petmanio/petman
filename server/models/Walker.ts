import {
  AllowNull, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { User } from './User';

@Table({
  tableName: 'walker',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Walker extends Model<Walker> {
  /**
   * Fields
   */
  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  price: number;

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
    delete obj.deleted;
    return obj;
  }
}
