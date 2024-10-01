import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto/return-types.dto';
import { Admin } from 'src/app/auth/decorators/admin.decorator';

@ApiTags('User')
@ApiBearerAuth()
@Admin()
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

  @Put('update/:id')
  async updateUser(@Body() user: UpdateUserDto) {
    return await this.userService.updateUser(user);
  }

  @Delete('remove/:id')
  async removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.removeUser(id);
  }
}
