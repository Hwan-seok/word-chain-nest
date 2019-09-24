import {
  Table,
  Column,
  Model,
  HasOne,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import { UserEntity } from '../user/user.entity';
import { RoomEntity } from '../room/room.entity';

@Table({ tableName: 'Messages', underscored: true })
export class Message extends Model<Message> {
  @HasOne(() => UserEntity, { foreignKey: 'id', constraints: false })
  user: UserEntity;

  @Column
  contents: string;

  @Column
  date: Date;

  @ForeignKey(() => RoomEntity)
  @Column
  roomNum: Number;

  @BelongsTo(() => RoomEntity)
  room: RoomEntity;
}
