import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  login: string;
}
