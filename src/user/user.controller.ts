import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  ConflictException,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findUser(@Param('id') id): Promise<UserEntity> {
    return await this.userService.findUserById(id);
  }

  @Post()
  async createUser(@Body() user: UserDTO) {
    await this.userService.create(user);
  }

  @Put()
  async updateUser(@Body() user: UserDTO) {
    this.userService.update(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id) {
    await this.userService.delete(id);
  }
}
