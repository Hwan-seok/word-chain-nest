import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import * as jwt from 'jsonwebtoken';
import { WsException } from '@nestjs/websockets';
import { UserDTO } from '../../user/dto/user.dto';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class JWTService {
  private readonly privateKey: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.privateKey = this.configService.get('JWT_SECRET');
  }

  async generate(user: UserDTO): Promise<any> {
    delete user.password;
    const payload = {
      user,
    };

    const accessTokenPromise = jwt.sign(payload, this.privateKey, {
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES'),
    });

    const refreshTokenPromise = jwt.sign(payload, this.privateKey, {
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES'),
    });

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);
    console.log(await jwt.verify(accessToken, this.privateKey));
    return { accessToken, refreshToken };
  }

  async verify(token: string, isWs: boolean = false): Promise<any> {
    try {
      const payload: any = await jwt.verify(token, this.privateKey);
      console.log('payload', payload);
      const user: UserEntity = await this.userService.findUserById(
        payload.userId,
      );

      if (!user) {
        if (isWs) {
          throw new WsException('Unauthorized access');
        } else {
          throw new HttpException(
            'Unauthorized access',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else return user;
    } catch (err) {
      console.log('err', err);
    }
  }
}
