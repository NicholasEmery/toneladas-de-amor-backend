import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({
    default: "example@gmail.com",
    description: "Email do usuário",
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    default: "Example User",
    description: "Nome do usuário",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    default: "123456789",
    description: "Telefone do usuário",
  })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiProperty({
    default: "Rua Exemplo, 123",
    description: "Endereço do usuário",
  })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiProperty({
    default: "examplePassword",
    description: "Senha do usuário",
  })
  @IsOptional()
  @IsString()
  password?: string;
}
