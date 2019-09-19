import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from './config/config.module';
import { LoggerMiddleware } from './logger/middleware';
import { CatsController } from './cats/cats.controller';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    CatsModule,
    ConfigModule,
    EventsModule,
    AuthModule,
    UserModule,
    DatabaseModule,
    WordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
