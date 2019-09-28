import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { RoomDTO } from './model/room.model';
import { RoomService } from './room.service';
import { SHOWING_ROOMS_PER_PAGE } from './room.constant';

@Controller('room')
export class RoomController {
  SHOWING_ROOMS_PER_PAGE;
  constructor(private readonly roomService: RoomService) {
    this.SHOWING_ROOMS_PER_PAGE = SHOWING_ROOMS_PER_PAGE;
  }

  @Get(':roomNum')
  async showRoom(@Param('roomNum') roomNum: number) {
    return this.roomService.findOne({ roomNum });
  }

  @Get('/page/:page')
  async pagingRoom(@Param('page') page: number) {
    return this.roomService.findAll(
      (page - 1) * SHOWING_ROOMS_PER_PAGE,
      SHOWING_ROOMS_PER_PAGE,
    );
  }

  @Post()
  async createRoom(@Body() room: RoomDTO) {
    this.roomService.create(room);
  }

  @Put()
  async updateRoom(@Body() room: RoomDTO) {
    this.roomService.update(room);
  }

  @Delete(':name')
  async deleteRoom(@Param('name') name) {
    console.log(name);
    this.roomService.delete(name);
  }
}
