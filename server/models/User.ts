import { BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, IsEmail, Model, Table, Unique } from 'sequelize-typescript';
import { UserData } from './UserData';
import { AuthProvider } from './AuthProvider';
import { Room } from './Room';

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

  @HasMany(() => Room)
  rooms: Room[];

  @BelongsToMany(() => User, 'user_business_user', 'business_user_id')
  businessUsers: User[];

  @BelongsToMany(() => User, 'user_business_user', 'owner_id', 'business_user_id')
  owners: User[];

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
