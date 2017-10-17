import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './User';
import { Gender } from '../../common/enums/index';

@Table({
  tableName: 'user_data',
  underscored: true,
  paranoid: true,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
})
export class UserData extends Model<UserData> {
  /**
   * Fields
   */
  @Column({
    type: DataType.ENUM(Gender.MALE, Gender.FEMALE)
  })
  gender: Gender;

  @Column
  avatar: string;

  @Column({
    field: 'first_name'
  })
  firstName: string;

  @Column({
    field: 'last_name'
  })
  lastName: string;
  /**
   * Associations
   */
  @ForeignKey(() => User)
  @Column({field: 'user_id'})
  userId: number;

  @BelongsTo(() => User)
  user: User;

  /**
   * Default
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
