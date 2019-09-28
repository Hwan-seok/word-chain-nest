import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { RoomDTO } from './model/room.model';
import { ROOM_REPOSITORY } from './room.constant';
import { RoomEntity } from './room.entity';
import { UserEntity } from '../user/user.entity';
import { FindOptions } from './option/room.findOption';

@Injectable()
export class RoomService {
  constructor(
    @Inject(ROOM_REPOSITORY)
    private readonly roomRepository: typeof RoomEntity,
  ) {}

  async findAll(offset: number, limit: number, isStarted: boolean = false) {
    return await this.roomRepository.findAll({
      where: {
        isStarted,
      },
      offset,
      limit,
    });
  }

  async findOne(findOptions: FindOptions) {
    return await this.roomRepository.findOne({
      where: { ...findOptions },
      include: [{ model: UserEntity }],
      //TODO:userId 포함하는놈 있을때만 하도록 include where절 삽입
    });
  }

  async create(room: RoomDTO) {
    const [foundRoom, isCreated] = await this.roomRepository.findOrCreate({
      where: { name: room.name },
      defaults: room,
    });
    if (isCreated === false) {
      throw new ConflictException('Requested ID Already Exists Exception');
    }
  }

  async update(room: any) {
    this.roomRepository.update(
      { ...room },
      { where: { roomNum: room.roomNum } },
    );
  }

  async delete(roomName: string) {
    const isDeleted = await this.roomRepository.destroy({
      where: { name: roomName },
    });
    if (!isDeleted) throw new ConflictException('Room not exists');
  }

  //   async findAllRooms(offset: number) {
  //     this.roomRepository.findAndCountAll({ limit: 10, offset });
  //   }
  //   async createRoom(room: RoomDTO) {}
}
