import { Module } from '@nestjs/common';
import { roomProviders } from './room.providers';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
@Module({
  controllers: [RoomController],
  providers: [RoomService, ...roomProviders],
  exports:[RoomService]
})
export class RoomModule {}
