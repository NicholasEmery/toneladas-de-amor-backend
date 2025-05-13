import {
  IsString,
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { Type } from "class-transformer";
import { CreateFieldsRoleDonatorDto } from "../fieldsRoleUser/createFieldsRole/createFieldsRoleDonator.dto";

export class CreateUserDonatorDto {
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
    default: "DONATOR",
    description: "Cargo do usuário",
  })
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @Matches(/^[A-Z]*$/, {
    message: "Role must only contain uppercase letters",
  })
  @Matches(/^DONATOR$/, {
    message: "Role must be 'DONATOR'",
  })
  role!: Role;

  @ApiProperty({
    default: {
      nameBusiness: "Exemplo LTDA",
      cnpj: "12.345.678/0001-99",
      address: {
        street: "Rua Exemplo",
        number: "123",
        complement: "Apto 456",
        neighborhood: "Bairro Exemplo",
        city: "Cidade Exemplo",
        state: "Estado Exemplo",
        zipCode: "12345678",
      },
    },
    description: "Campos específicos para o usuário do tipo 'DONATOR'",
  })
  @ValidateNested()
  @Type(() => CreateFieldsRoleDonatorDto)
  @IsNotEmpty()
  fieldsRole!: CreateFieldsRoleDonatorDto;
}
