import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(userId: string, pass: string): Promise<any> {
    const user: UserEntity = await this.userService.findUserById(userId, false);
    // TODO: 암호화
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }
  async login(user: UserEntity) {
    const { id, email, userName, isAdmin, participatedRoom } = user;
    const payload = { id, email, userName, isAdmin, participatedRoom };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES'),
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES'),
      }),
    };
  }
}
