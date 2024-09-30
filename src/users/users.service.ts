import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponse } from 'src/utils/return-types';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async listUsers(): Promise<UserResponse[]> {
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
}
