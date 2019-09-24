import {
  Table,
  Model,
  Column,
  CreatedAt,
  PrimaryKey,
  Default,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { Message } from '../chat/chat.entity';
import { RoomEntity } from '../room/room.entity';

@Table({ tableName: 'Users', underscored: true })
export class UserEntity extends Model<UserEntity> {
  @PrimaryKey
  @Column
  id: String;

  @Column
  password: String;

  @Column
  email: String;

  @Column
  userName: String;

  @ForeignKey(() => RoomEntity)
  @Column
  participated: Number;

  @Default(false)
  @Column
  isAdmin: Boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => RoomEntity)
  room: RoomEntity;
}
