import { Injectable, Inject } from '@nestjs/common';
import { WordEntity } from './word.entity';
import { WORDS_REPOSITORY } from './word.constants';

@Injectable()
export class WordService {
  constructor(
    @Inject(WORDS_REPOSITORY)
    private readonly WORDS_REPOSITORY: typeof WordEntity,
  ) {}

  async findOne(): Promise<WordEntity[]> {
    return await this.WORDS_REPOSITORY.findAll<WordEntity>();
  }
}
