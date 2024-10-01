import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/return-types.dto';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signInClient(signInDto.login, signInDto.password);
  }

  @Public()
  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    return this.authService.SignUpCLient(user);
  }
}
