import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class FieldsCallBackDto {
  @ApiProperty({
    description: "The URL to redirect to if the checkout session success.",
    example: "https://example.com/checkout/success",
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  successUrl!: string;

  @ApiProperty({
    description: "The URL to redirect to if the checkout session cancel.",
    example: "https://example.com/checkout/cancel",
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  cancelUrl!: string;

  @ApiProperty({
    description: "The URL to redirect to if the checkout session expires.",
    example: "https://example.com/checkout/expire",
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  expireUrl!: string;
}
