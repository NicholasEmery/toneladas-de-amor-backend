import { IsNotEmpty, IsNumberString, IsOptional, IsString, Matches } from "class-validator";

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString({ no_symbols: true }, { message: "Number must be a valid number without symbols" })
  number!: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  neighborhood!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString({ no_symbols: true }, { message: "Zip code must be a valid number without symbols" })
  @Matches(/^\d{8}$/, {
    message: "Zip code must be exactly 8 digits",
  })
  zipCode!: string;
}
