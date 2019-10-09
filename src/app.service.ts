import { Injectable } from '@nestjs/common';
const uuid = require('uuid').v4();

@Injectable()
export class AppService {

  heartBeat(): any {
    return {
      status: 'Alive!',
      uuid,
    };
  }
}
