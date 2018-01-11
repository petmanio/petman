import { find } from 'lodash';
import {
  BelongsToMany, Column, CreatedAt, DeletedAt, HasMany, HasOne, IsEmail, Model, Table, Unique,
  UpdatedAt,
} from 'sequelize-typescript';

import { AuthProviderType } from '../../common/enums';
import { getFacebookById, getUserFbAvatarByFbId } from '../services/util/util.service';
import { Adopt } from './Adopt';
import { AuthProvider } from './AuthProvider';
import { Shelter } from './Shelter';
import { UserData } from './UserData';
import { Walker } from './Walker';
import { LostFound } from './LostFound';
import { Organization } from './Organization';

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

  @HasMany(() => Walker)
  walkers: Walker[];

  @HasMany(() => Adopt)
  adoption: Adopt[];

  @HasMany(() => Adopt)
  lostFound: LostFound[];

  @HasMany(() => Organization)
  organizations: Organization[];

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
        obj.userData = obj.userData.toJSON();
        obj.userData.avatar = obj.userData.avatar || getUserFbAvatarByFbId(fbAuthProvider.externalId);
        obj.userData.facebook = obj.userData.facebook || getFacebookById(fbAuthProvider.externalId);
      }
    }
    delete obj.deleted;
    delete obj.password;
    delete obj.authProviders;
    return obj;
  }
}
