import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, Matches } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FieldsCustomerDataDto {
  @ApiProperty({
    description: "Customer's full name",
    example: "João da Silva",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "CPF or CNPJ number (11 or 14 digits)",
    example: "73761704054",
  })
  @IsString()
  @Length(11, 14, {
    message: "You must provide a valid CPF or CNPJ (11 or 14 digits).",
  })
  @IsNotEmpty()
  cpfCnpj!: string;

  @ApiProperty({
    description: "Customer's email address",
    example: "joao@email.com",
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: "Customer's phone number in Brazilian format",
    example: "8325779357",
  })
  @IsString()
  @IsPhoneNumber("BR")
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({
    description: "Street address",
    example: "Rua das Flores",
  })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({
    description: "Address number",
    example: "123",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, {
    message: "Address number must be a valid number.",
  })
  addressNumber!: string;

  @ApiPropertyOptional({
    description: "Address complement (optional)",
    example: "Apto 45",
  })
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiProperty({
    description: "Neighborhood (bairro)",
    example: "Centro",
  })
  @IsString()
  @IsNotEmpty()
  province!: string;

  @ApiProperty({
    description: "Postal code in format XXXXX-XXX",
    example: "71995-065",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}-\d{3}$/, {
    message: "Postal code must be in the format XXXXX-XXX.",
  })
  postalCode!: string;

  @ApiProperty({
    description: "City IBGE code (7 digits)",
    example: "3550308",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{7}$/, {
    message: "City must be a valid 7-digit IBGE code.",
  })
  city!: string;
}
