import { Injectable, Inject } from '@nestjs/common';
import { Word } from './word.entity';

// @Injectable()
// export class WordService {
//   findAll(): number {
//     return 1;
//   }
// }

@Injectable()
export class WordService {
  constructor(
    @Inject('WORD_REPOSITORY') private readonly WORD_REPOSITORY: typeof Word,
  ) {}
  async findAll(): Promise<Word> {
    return await this.WORD_REPOSITORY.findOne<Word>();
  }
}
