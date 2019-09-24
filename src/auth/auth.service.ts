import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userId: string, pass: string): Promise<any> {
    const user: UserEntity = await this.userService.findUserById(userId);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }
  async login(user: UserEntity) {
    console.log('user2', user);
    const payload = { id: user.id };
    console.log('payload', payload);

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '2 days' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '14 days' }),
    };
  }
}
