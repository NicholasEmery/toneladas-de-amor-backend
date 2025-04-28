import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
  @ApiProperty({
    default: "",
    description: "Refresh token do usuário",
  })
  @IsString()
  @IsNotEmpty()
  refresh_token!: string;
}
