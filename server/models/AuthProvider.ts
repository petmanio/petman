import { BelongsTo, Column, DataType, ForeignKey, Model, NotNull, Table, Unique } from 'sequelize-typescript';
import { User } from './User';
import { AuthProviderType } from '../../common/enums/index';

@Table({
  tableName: 'auth_provider',
  underscored: true,
  paranoid: true,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
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

  @NotNull
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
