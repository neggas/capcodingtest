import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
