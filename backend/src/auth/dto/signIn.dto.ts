import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    default: 'example@gmail.com',
    description: 'Email do usuário',
  })
  @IsString()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    default: 'examplePassword',
    description: 'Senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
