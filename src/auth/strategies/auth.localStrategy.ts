import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'id',
      passwordField: 'password',
    },);
  }

  async validate(id: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(id, password);

      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
    }
  }
}
