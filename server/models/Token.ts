import { BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from './User';
import { TokenType } from '../../common/enums/index';

@Table({
  tableName: 'token',
  underscored: true,
  paranoid: true,
  timestamps: true
})
export class Token extends Model<Token> {
  /**
   * Fields
   */
  @Column(DataType.DATE)
  expiration: Date;

  @Column(DataType.DATE)
  used: Date;

  @Column({
    type: DataType.ENUM(TokenType.AUTH, TokenType.AUTH_REMEMBER_ME, TokenType.PASSWORD_RESET, TokenType.RESET_EMAIL)
  })
  type: TokenType;

  @Column(DataType.JSON)
  metadata: any;
  /**
   * Associations
   */
  @ForeignKey(() => User)
  @Column({field: 'user_id'})
  userId: number;

  @BelongsTo(() => User)
  user: User;

  /**
   * Default
   */
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
    const obj = super.get({clone: true});
    delete obj.deleted;
    delete obj.metadata;
    return obj;
  }
}
