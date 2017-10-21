import {
  BelongsToMany,
  Column,
  CreatedAt,
  DeletedAt,
  HasMany,
  HasOne,
  IsEmail,
  Model,
  Table,
  Unique,
  UpdatedAt
} from 'sequelize-typescript';
import { find } from 'lodash';
import { UserData } from './UserData';
import { AuthProvider } from './AuthProvider';
import { Room } from './Room';
import { AuthProviderType } from '../../common/enums/index';
import { getUserFbAvatarByFbId } from '../services/util/util.service';

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
  @HasOne(() => UserData)
  userData: UserData;

  @HasMany(() => AuthProvider)
  authProviders: AuthProvider[];

  @HasMany(() => Room)
  rooms: Room[];

  @BelongsToMany(() => User, 'user_business_user', 'owner_id')
  owners: User[];

  @BelongsToMany(() => User, 'user_business_user', 'owner_id', 'business_user_id')
  businessUsers: User[];

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
    const obj = super.get({clone: true});
    if (obj.userData && !obj.userData.avatar && obj.authProviders) {
      // FIXME: remove any
      const fbAuthProvider: any = find(obj.authProviders, {type: AuthProviderType.FACEBOOK});
      if (fbAuthProvider) {
        obj.userData.avatar = getUserFbAvatarByFbId(fbAuthProvider.externalId);
      }
    }
    delete obj.deleted;
    delete obj.password;
    delete obj.authProviders;
    return obj;
  }
}
