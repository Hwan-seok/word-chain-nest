import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatEvents } from './chat.events';

@Module({
  providers: [ChatService, ChatEvents],
})
export class EventsModule {}
