import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { JWTService } from './jwt/jwt.service';
import { UserDTO } from '../user/dto/user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JWTService) {}

  @Post()
  async login(@Body() userDTO: UserDTO) {
    return this.jwtService.generate(userDTO);
  }
  @Get(':token')
  async wer(@Param('token') token) {
    return this.jwtService.decrypt(token);
  }
}
