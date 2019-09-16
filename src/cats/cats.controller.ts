import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDTO } from './dto/cats.createCats.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateCatDTO) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
  }
}
