import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateAddressDto } from "../../../user/dto/fieldsRoleUser/createFieldsRole/createAddressUser/createAddress.dto";
import { Type } from "class-transformer";

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
    example: "12345678901",
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
    example: "+5511999999999",
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
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address!: CreateAddressDto["street"];

  @ApiProperty({
    description: "Address number",
    example: "123",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, {
    message: "Address number must be a valid number.",
  })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  addressNumber!: CreateAddressDto["number"];

  @ApiPropertyOptional({
    description: "Address complement (optional)",
    example: "Apto 45",
  })
  @IsString()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  complement?: CreateAddressDto["complement"];

  @ApiProperty({
    description: "Neighborhood (bairro)",
    example: "Centro",
  })
  @IsString()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  province!: CreateAddressDto["neighborhood"];

  @ApiProperty({
    description: "Postal code in format XXXXX-XXX",
    example: "12345-678",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}-\d{3}$/, {
    message: "Postal code must be in the format XXXXX-XXX.",
  })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  postalCode!: CreateAddressDto["zipCode"];

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
