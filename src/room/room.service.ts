import { Injectable, Inject } from '@nestjs/common';
import { RoomDTO } from './model/room.model';
import { ROOM_REPOSITORY } from './room.constant';
import { RoomEntity } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @Inject(ROOM_REPOSITORY)
    private readonly roomRepository: typeof RoomEntity,
  ) {}

  async joinUser(roomNum: string, userId: string) {}

  async leaveUser(roomNum: string, userId: string) {}

  async findAll() {}

  async create() {}

  async update() {}

  async delete() {}

  //   async findAllRooms(offset: number) {
  //     this.roomRepository.findAndCountAll({ limit: 10, offset });
  //   }
  //   async createRoom(room: RoomDTO) {}
}
