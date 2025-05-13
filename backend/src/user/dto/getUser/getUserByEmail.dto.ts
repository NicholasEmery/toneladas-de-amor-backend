import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetUserByEmailDto {
  @ApiProperty({
    default: "example@gmail.com",
    description: "Email do usuário",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;
}
