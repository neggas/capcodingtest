import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostgresErrorCode, PostGresPrismaError } from 'src/utils/constants';
import { appEnv, isDatabaseError } from 'src/utils/functions';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types';
import { TokenObjectDto } from './dto/tokenObject.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/app/users/dto/return-types.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private generateTokens(payload: Omit<JwtPayload, 'type'>): TokenObjectDto {
    const safePayload: Omit<JwtPayload, 'type'> = {
      userId: payload.userId,
      isAdmin: payload.isAdmin,
    };

    const accessPayload: JwtPayload = { type: 'access', ...safePayload };

    const refreshPayload: JwtPayload = { type: 'refresh', ...safePayload };

    const accessToken = this.jwtService.sign(accessPayload, {
      expiresIn: appEnv() != 'production' ? '1d' : '5m',
    });

    const refreshToken = this.jwtService.sign(refreshPayload, {
      expiresIn: '30 days',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async signInClient(login: string, pass: string) {
    try {
      const foundUser = await this.prismaService.user.findUniqueOrThrow({
        where: { login: login },
      });

      const { password, ...user } = foundUser;

      if (!bcrypt.compareSync(pass, password)) {
        return new UnauthorizedException();
      }

      return this.generateTokens({ userId: user.id, isAdmin: user.isAdmin });
    } catch (error) {
      if (!isDatabaseError(error)) {
        throw new Error(error);
      }

      if (error.code === PostgresErrorCode.NotFoundError) {
        throw new UnauthorizedException();
      }

      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException();
      }
    }
  }

  async SignUpCLient(client: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(client.password, 10);

      const creteadUser = await this.prismaService.user.create({
        data: { ...client, password: hash },
      });

      return this.generateTokens({
        isAdmin: creteadUser.isAdmin,
        userId: creteadUser.id,
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

  async getMeUser(id: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { id: id },
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
      if (!isDatabaseError(error)) {
        throw new Error(error);
      }

      if (error.code === PostgresErrorCode.NotFoundError) {
        throw new UnauthorizedException();
      }

      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException();
      }
    }
  }
}
