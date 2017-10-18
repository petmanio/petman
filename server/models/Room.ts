import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'room',
  underscored: true,
  paranoid: true,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
})
export class Room extends Model<Room> {
  /**
   * Fields
   */
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
  @Column({
    field: 'created_at',
    type: DataType.DATE
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE
  })
  updatedAt: Date;

  @Column({
    field: 'deleted_at',
    type: DataType.DATE
  })
  deletedAt: Date;
}
