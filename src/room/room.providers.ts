import { RoomEntity } from './room.entity';
import { ROOM_REPOSITORY } from './room.constant';

export const roomProviders = [
  {
    provide: ROOM_REPOSITORY,
    useValue: RoomEntity,
  },
];
