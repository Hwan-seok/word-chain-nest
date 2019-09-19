import { Word } from './word.entity';

export const wordsProviders = [
  {
    provide: 'WORDS_REPOSITORY',
    useValue: Word,
  },
];
