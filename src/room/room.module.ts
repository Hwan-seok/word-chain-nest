import { Module } from '@nestjs/common';
import { roomProviders } from './room.providers';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
@Module({
  controllers: [RoomController],
  providers: [RoomService, ...roomProviders],
})
export class RoomModule {}
