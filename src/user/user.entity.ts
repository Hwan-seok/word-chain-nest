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
  id: string;

  @Column
  password: string;

  @Column
  email: string;

  @Column
  userName: string;

  @ForeignKey(() => RoomEntity)
  @Column
  participatedRoom: number;

  @Default(false)
  @Column
  isAdmin: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => RoomEntity)
  room: RoomEntity;
}
