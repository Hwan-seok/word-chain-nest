import {
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  HasMany,
  Table,
  HasOne,
} from 'sequelize-typescript';
import { Message } from '../chat/chat.entity';
import { UserEntity } from '../user/user.entity';

@Table({ tableName: 'Rooms', underscored: true })
export class RoomEntity extends Model<RoomEntity> {
  @PrimaryKey
  @Column
  roomNum: Number;

  @Column
  name: String;

  @Column
  description?: String;

  @Column
  isPrivate: Boolean;

  @Column
  maxUsers: Number;

  @HasMany(() => UserEntity)
  users: UserEntity[];

  @HasMany(() => Message)
  messages: Message[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
