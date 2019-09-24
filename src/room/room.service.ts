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
  //   async findAllRooms(offset: number) {
  //     this.roomRepository.findAndCountAll({ limit: 10, offset });
  //   }
  //   async createRoom(room: RoomDTO) {}
}
