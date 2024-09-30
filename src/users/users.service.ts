import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UserResponseDto } from './dto/return-types.dto';
import { isDatabaseError } from 'src/utils/functions';
import { PostgresErrorCode, PostGresPrismaError } from 'src/utils/constants';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async listUsers(): Promise<UserResponseDto[]> {
    try {
      return await this.prismaService.user.findMany({
        select: {
          id: true,
          name: true,
          firstname: true,
          address: true,
          city: true,
          country: true,
          createdAt: true,
          email: true,
          phone: true,
          postcode: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
    try {
      return await this.prismaService.user.create({
        data: user,
        select: {
          address: true,
          city: true,
          country: true,
          createdAt: true,
          email: true,
          firstname: true,
          id: true,
          phone: true,
          name: true,
          postcode: true,
        },
      });
    } catch (error) {
      if (!isDatabaseError(error)) {
        throw new Error(error);
      }

      if (error.code === PostgresErrorCode.UniqueViolation) {
        const prismaError = error as PostGresPrismaError;

        if (prismaError.meta.target.includes('login')) {
          throw new BadRequestException('Login is used');
        }

        if (prismaError.meta.target.includes('email')) {
          throw new BadRequestException('Email is used');
        }
      }
    }
  }
}
