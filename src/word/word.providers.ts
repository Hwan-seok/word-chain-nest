import { WordEntity } from './word.entity';
import { WORDS_REPOSITORY } from './word.constants';

export const wordsProviders = [
  {
    provide: WORDS_REPOSITORY,
    useValue: WordEntity,
  },
];
