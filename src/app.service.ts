import { Injectable } from '@nestjs/common';
import { WordService } from './word/word.service';
const uuid = require('uuid').v4();

@Injectable()
export class AppService {
  constructor(private readonly wordService: WordService) {}

  heartBeat(): string {
    console.log(this.wordService.findOne());
    return `Alive! ${uuid} `;
  }
}
