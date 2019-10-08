import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoomDTO } from './model/room.model';
import { RoomService } from './room.service';
import { SHOWING_ROOMS_PER_PAGE } from './room.constant';
import { AuthGuard } from '@nestjs/passport';

@Controller('room')
export class RoomController {
  SHOWING_ROOMS_PER_PAGE;
  constructor(private readonly roomService: RoomService) {
    this.SHOWING_ROOMS_PER_PAGE = SHOWING_ROOMS_PER_PAGE;
  }

  @Get(':roomNum')
  async showRoom(@Param('roomNum') roomNum: number) {
    return await this.roomService.findOne({ roomNum });
  }

  @Get('/page/:page')
  async pagingRoom(
    @Param('page') page: number,
    @Query('startedFilter') startedFilter: string,
    @Query('privateFilter') privateFilter: string,
  ) {
    return await this.roomService.findAll(
      (page - 1) * SHOWING_ROOMS_PER_PAGE,
      SHOWING_ROOMS_PER_PAGE,
      startedFilter,
      privateFilter,
    );
  }

  @Post()
  @UseGuards(AuthGuard())
  async createRoom(@Body() room: RoomDTO) {
    this.roomService.create(room);
  }

  @Put()
  async updateRoom(@Body() room: RoomDTO) {
    this.roomService.update(room);
  }

  @Delete(':roomNum')
  async deleteRoom(@Param('roomNum') roomNum) {
    this.roomService.delete(roomNum);
  }
}
