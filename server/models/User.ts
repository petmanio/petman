import { find } from 'lodash';
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
  UpdatedAt,
} from 'sequelize-typescript';

import { AuthProviderType } from '../../common/enums/index';
import { getUserFbAvatarByFbId } from '../services/util/util.service';
import { Adopt } from './Adopt';
import { AuthProvider } from './AuthProvider';
import { Shelter } from './Shelter';
import { UserData } from './UserData';

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

  @HasMany(() => Shelter)
  shelters: Shelter[];

  @HasMany(() => Adopt)
  adoption: Adopt[];

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
      const fbAuthProvider = find(obj.authProviders, provider => provider.type === AuthProviderType.FACEBOOK);
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
