import {
  IsString,
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(6)
  @Matches(/^[a-zA-Z0-9@!\/$#%&*]*$/, {
    message: 'Password can only contain letters, numbers, and special characters @, !, \, /, $, #, %, &, *',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  role: string;
}
