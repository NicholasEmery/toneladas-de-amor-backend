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
    default: "examplePassword",
    description: "Senha do usuário",
  })
  @IsOptional()
  @IsString()
  password?: string;
}
