import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  NotNull,
  Table,
  Unique,
  UpdatedAt
} from 'sequelize-typescript';
import { User } from './User';
import { AuthProviderType } from '../../common/enums/index';

@Table({
  tableName: 'auth_provider',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class AuthProvider extends Model<AuthProvider> {
  /**
   * Fields
   */
  @Unique
  @Column({
    field: 'external_id'
  })
  externalId: string;

  @AllowNull
  @Column({
    type: DataType.ENUM(AuthProviderType.FACEBOOK)
  })
  type: AuthProviderType;

  @Column({
    field: 'access_token'
  })
  accessToken: string;

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
    delete obj.externalId;
    delete obj.accessToken;
    return obj;
  }
}
