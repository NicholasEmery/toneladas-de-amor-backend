import { ApiProperty } from "@nestjs/swagger";
import { IsBase64, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class FieldsItemsDto {
  @ApiProperty({
    description: "Descrição detalhada do item do pagamento",
    example: "Doação PIX",
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    description: "Imagem do item em base64 (opcional)",
    example: "iVBORw0KGgoAAAANSUhEUgAA...",
    required: false,
  })
  @IsString()
  @IsBase64()
  @IsOptional()
  imageBase64?: string;

  @ApiProperty({
    description: "Nome do item",
    example: "Doação",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Quantidade do item",
    example: 1,
  })
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @Min(1, {
    message: "Quantity must be a positive integer.",
  })
  quantity!: number;

  @ApiProperty({
    description: "Valor do item",
    example: 50.0,
  })
  @IsNumber()
  @IsNotEmpty()
  value!: number;
}
