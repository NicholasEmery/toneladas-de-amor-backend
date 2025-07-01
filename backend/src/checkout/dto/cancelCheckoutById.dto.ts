import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CancelCheckoutByIdDto {
  @ApiProperty({
    description: "The ID of the checkout to cancel.",
    example: "Checkout ID",
  })
  @IsString()
  @IsNotEmpty()
  id!: string;
}
