import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { wordsProviders } from './word.providers';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  exports: [WordService],
  providers: [WordService, ...wordsProviders],
})
export class WordModule {}
