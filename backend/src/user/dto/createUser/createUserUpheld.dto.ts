import {
  IsString,
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  IsMobilePhone,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { CreateFieldsRoleUpheldDto } from "../fieldsRoleUser/createFieldsRole/createFieldsRoleUpheld.dto";
import { Type } from "class-transformer";

export class CreateUserUpheldDto {
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
  @Matches(/^[a-zA-Z0-9@!\/$#%&*]*$/, {
    message:
      "Password can only contain letters, numbers, and special characters @, !, \, /, $, #, %, &, *",
  })
  @Length(6)
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    default: "83991238499",
    description: "Telefone do usuário",
  })
  @Length(10, 10, { message: "Phone must be exactly 10 digits" })
  @IsMobilePhone("pt-BR")
  @Matches(/^[0-9]*$/, {
    message: "Phone must only contain numbers",
  })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({
    default: "UPHELD",
    description: "Cargo do usuário",
  })
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @Matches(/^[A-Z]*$/, {
    message: "Role must only contain uppercase letters",
  })
  @Matches(/^UPHELD$/, {
    message: "Role must be 'UPHELD'",
  })
  role!: Role;

  @ApiProperty({
    default: {
      employmentSituation: "Desempregado",
      numberOfPeopleInTheHousehold: 3,
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
    description: "Campos específicos para o usuário do tipo 'UPHELD'",
  })
  @ValidateNested()
  @Type(() => CreateFieldsRoleUpheldDto)
  @IsNotEmpty()
  fieldsRole!: CreateFieldsRoleUpheldDto;
}
