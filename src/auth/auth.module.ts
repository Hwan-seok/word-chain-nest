import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTService } from './jwt/jwt.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [UserModule],
  providers: [AuthService, JWTService],
  controllers: [AuthController],
  exports: [JWTService],
})
export class AuthModule {}
