import { IsMobilePhone, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetUserByPhoneDto {
  @ApiProperty({
    description: "Número de telefone do usuário",
    example: "+5511999999999",
  })
  @IsNotEmpty()
  @IsString()
  @IsMobilePhone("pt-BR")
  phone!: string;
}
