import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { JWTService } from './jwt/jwt.service';
import { UserDTO } from '../user/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log('user', req.user);
    return this.authService.login(req.user);
  }
  @Get(':token')
  async wer(@Param('token') token) {
    return this.jwtService.decrypt(token);
  }
}
