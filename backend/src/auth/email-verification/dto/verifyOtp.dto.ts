import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOptDto {
  @ApiProperty({
    default: '59083',
    description: 'OTP gerado pelo usuário',
  })
  @IsString()
  @IsNotEmpty()
  otp: string;

  @ApiProperty({
    default: 'example@gmail.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
