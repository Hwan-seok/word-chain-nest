import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatEvents } from './chat.events';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    RoomModule,
  ],
  providers: [ChatService, ChatEvents],
})
export class EventsModule {}
