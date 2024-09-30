import { PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsCountry } from 'src/validators/is-country-validators';

export class UserResponseDto {
  id: string;
  name: string;
  firstname: string;
  address: string;
  city: string;
  country: string;
  createdAt: Date;
  email: string;
  phone: string;
  postcode: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsCountry()
  country: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  postcode: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  login: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
