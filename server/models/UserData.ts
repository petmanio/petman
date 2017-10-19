import { AllowNull, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from './User';
import { Gender } from '../../common/enums/index';

@Table({
  tableName: 'user_data',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class UserData extends Model<UserData> {
  /**
   * Fields
   */
  @AllowNull
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
    const obj = super.toJSON();
    delete obj.deleted;
    return obj;
  }
}
