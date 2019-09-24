import { Controller, Post, Delete, Get, Body } from '@nestjs/common';
import { RoomDTO } from './model/room.model';

@Controller('room')
export class RoomController {
  @Get()
  async find() {}

  @Post()
  async create(@Body() room:RoomDTO) {
      
  }

  @Delete()
  async delete() {}
}
