import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CancelCheckoutByIdDto {
  @ApiProperty({
    description: "The ID of the checkout to cancel.",
    example: "1234567890",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, { message: "id must contain only numbers" })
  id!: string;
}
