import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetUserByNameDto {
  @ApiProperty({
    default: "John Doe",
    description: "Name of the user to be retrieved",
  })
  @IsNotEmpty()
  @IsString()
  name!: string;
}
