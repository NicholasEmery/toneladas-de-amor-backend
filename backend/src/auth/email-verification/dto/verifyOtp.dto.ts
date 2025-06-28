import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyOptDto {
  @ApiProperty({
    default: "OTP",
    description: "OTP gerado pelo usuário",
  })
  @IsString()
  @IsNumberString()
  @Length(6, 6, { message: "OTP must be exactly 6 digits" })
  @IsNotEmpty()
  otp!: string;

  @ApiProperty({
    default: "example@gmail.com",
    description: "Email do usuário",
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
