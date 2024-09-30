import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/return-types.dto';

@ApiTags('User')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUser() {
    return this.userService.listUsers();
  }

  @Post()
  async createUser(@Body() userBody: CreateUserDto) {
    return this.userService.createUser(userBody);
  }

  @Get(':id')
  async findUser(@Param('id', ParseUUIDPipe) userId: string) {
    return this.userService.findUser(userId);
  }
}
