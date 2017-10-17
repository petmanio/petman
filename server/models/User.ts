import { Column, DataType, ForeignKey, HasMany, HasOne, IsEmail, Model, Table, Unique } from 'sequelize-typescript';
import { AuthProvider } from './AuthProvider';
import { UserData } from './UserData';

@Table({
  tableName: 'user',
  underscored: true,
  paranoid: true,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
})
export class User extends Model<User> {
  /**
   * Fields
   */
  @IsEmail
  @Unique
  @Column
  email: string;

  @Column
  password: string;

  /**
   * Associations
   */
  @ForeignKey(() => UserData)
  @Column({field: 'user_data_id'})
  userDataId: number;

  @HasOne(() => UserData)
  userData: UserData;

  @HasMany(() => AuthProvider)
  authProviders: AuthProvider[];

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
