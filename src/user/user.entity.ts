import {
  Table,
  Model,
  Column,
  CreatedAt,
  PrimaryKey,
  Default,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'Users', underscored: true })
export class UserEntity extends Model<UserEntity> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  password: string;

  @Column
  email: string;

  @Column
  userName: string;

  @Default(false)
  @Column
  isAdmin: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
