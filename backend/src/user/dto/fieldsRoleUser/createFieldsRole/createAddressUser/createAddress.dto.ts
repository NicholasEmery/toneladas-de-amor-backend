import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsString()
  @IsNotEmpty()
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
  @Matches(/^\d{8}$/, {
    message: "Zip code must be exactly 8 digits",
  })
  zipCode!: string;
}
