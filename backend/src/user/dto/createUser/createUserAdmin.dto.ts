import {
  IsString,
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class CreateUserAdminDto {
  @ApiProperty({
    default: "Example User",
    description: "Nome do usuário",
  })
  @Length(3)
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    default: "example@gmail.com",
    description: "Email do usuário",
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    default: "examplePassword",
    description: "Senha do usuário",
  })
  @Length(6)
  @Matches(/^[a-zA-Z0-9@!\/$#%&*]*$/, {
    message:
      "Password can only contain letters, numbers, and special characters @, !, \, /, $, #, %, &, *",
  })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    default: "83991238499",
    description: "Telefone do usuário",
  })
  @Length(10, 10, { message: "Phone must be exactly 10 digits" })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({
    default: "ADMIN",
    description: "Cargo do usuário",
  })
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @Matches(/^[A-Z]*$/, {
    message: "Role must only contain uppercase letters",
  })
  @Matches(/^ADMIN$/, {
    message: "Role must be 'ADMIN'",
  })
  role!: Role;
}
