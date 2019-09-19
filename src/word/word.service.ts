import { Injectable, Inject } from '@nestjs/common';
import { Word } from './word.entity';

@Injectable()
export class WordService {
  constructor(
    @Inject('WORDS_REPOSITORY') private readonly WORDS_REPOSITORY: typeof Word,
  ) {}

  async findOne(): Promise<Word[]> {
    return await this.WORDS_REPOSITORY.findAll<Word>();
  }
}
