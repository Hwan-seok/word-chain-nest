import { Injectable } from '@nestjs/common';
const uuid = require('uuid').v4();

@Injectable()
export class AppService {
  heartBeat(): string {
    return `Alive! ${uuid}`;
  }
}
