import {
  IsString,
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  Validate,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { UserFieldsRole } from "src/user/interfaces/user.interface";
import { CreateFieldsRoleColaboratorDto } from "../fieldsRoleUser/createFieldsRole/createFieldsRoleColaborator.dto";
import { Type } from "class-transformer";

export class CreateUserColaboratorDto {
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
  @Length(10, 15)
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({
    default: "COLABORATOR",
    description: "Cargo do usuário",
  })
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @Matches(/^[A-Z]*$/, {
    message: "Role must only contain uppercase letters",
  })
  @Matches(/^COLABORATOR$/, {
    message: "Role must be 'COLABORATOR'",
  })
  role!: Role;

  @ApiProperty({
    default: {
      department: "Departamento Exemplo",
      address: {
        street: "Rua Exemplo",
        number: "123",
        complement: "Apto 456",
        neighborhood: "Bairro Exemplo",
        city: "Cidade Exemplo",
        state: "Estado Exemplo",
        zipCode: "12345",
      },
    },
    description: "Campos específicos para o usuário do tipo 'COLABORATOR'",
  })
  @ValidateNested()
  @Type(() => CreateFieldsRoleColaboratorDto)
  @IsNotEmpty()
  fieldsRole!: CreateFieldsRoleColaboratorDto;
}
