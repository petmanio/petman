import { BelongsTo, Column, CreatedAt, DeletedAt, ForeignKey, Model, Table, UpdatedAt, DataType } from 'sequelize-typescript';
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

  @Column(DataType.NUMBER)
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
    delete obj.deleted;
    return obj;
  }
}
