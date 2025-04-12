import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyOptDto {
  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
