import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendOtpDto {
  @ApiProperty({
    default: "example@gmail.com",
    description: "Email do usuário",
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
