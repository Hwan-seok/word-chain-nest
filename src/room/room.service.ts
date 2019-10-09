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

  async findAll(
    offset: number,
    limit: number,
    startedFilter: string,
    privateFilter: string,
  ) {
    const where = {};
    if (startedFilter !== 'all') {
      where['isStarted'] = startedFilter === 'started' ? true : false;
    }
    if (privateFilter !== 'all') {
      where['isPrivate'] = privateFilter === 'private' ? true : false;
    }
    const foundRooms = this.roomRepository.findAll({
      where,
      offset,
      limit,
    });
    const foundAllRoomsCount = this.roomRepository.count({ where });

    const [rooms, foundCount] = await Promise.all([
      foundRooms,
      foundAllRoomsCount,
    ]);
    const pages = Math.ceil(foundCount / limit);
    return { rooms, pages };
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

  async delete(roomNum: number) {
    const isDeleted = await this.roomRepository.destroy({
      where: { roomNum },
    });
    if (!isDeleted) throw new ConflictException('Room not exists');
  }

  //   async findAllRooms(offset: number) {
  //     this.roomRepository.findAndCountAll({ limit: 10, offset });
  //   }
  //   async createRoom(room: RoomDTO) {}
}
