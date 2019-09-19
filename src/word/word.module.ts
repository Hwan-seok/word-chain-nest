import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { wordsProviders } from './word.providers';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [WordService, ...wordsProviders],
  exports: [WordService],
})
export class WordModule {}
