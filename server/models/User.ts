import {
  BelongsToMany,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  HasMany,
  HasOne,
  IsEmail,
  Model,
  Table,
  Unique,
  UpdatedAt
} from 'sequelize-typescript';
import { UserData } from './UserData';
import { AuthProvider } from './AuthProvider';
import { Room } from './Room';

@Table({
  tableName: 'user',
  underscored: true,
  paranoid: true,
  timestamps: true
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
    delete obj.password;
    delete obj.authProviders;
    return obj;
  }
}
