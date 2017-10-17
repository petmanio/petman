import { Column, DataType, HasMany, HasOne, IsEmail, Model, Table, Unique } from 'sequelize-typescript';
import { AuthProvider } from './AuthProvider';

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
