import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from 'src/app/users/dto/return-types.dto';
import { CurrentUser } from './decorators/current-user.decorator';

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

  @ApiBearerAuth()
  @Get('me')
  async loggedInUser(@CurrentUser() user) {
    return this.authService.getMeUser(user.id);
  }
}
