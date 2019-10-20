import {
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  HasMany,
  Table,
  HasOne,
  AutoIncrement,
  Default,
} from 'sequelize-typescript';
// import { Message } from '../chat/chat.entity';
import { UserEntity } from '../user/user.entity';

@Table({ tableName: 'Rooms', underscored: true })
export class RoomEntity extends Model<RoomEntity> {
  @AutoIncrement
  @PrimaryKey
  @Column
  roomNum: number;

  @Column
  name: string;

  @Column
  password: string;

  @Column
  owner: string;

  @Column
  description?: string;

  @Column
  isPrivate: boolean;

  @Column
  maxUsers: number;

  @Default(false)
  @Column
  isStarted: boolean;

  @HasMany(() => UserEntity)
  users: UserEntity[];

  // @HasMany(() => Message)
  // messages: Message[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
