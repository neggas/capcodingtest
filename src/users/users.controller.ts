import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
