import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  heartBeat(): string {
    return 'Alive!';
  }
}
