import { IsNotEmpty, IsObject, IsString, Matches, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./createAddressUser/createAddress.dto";
import { Type } from "class-transformer";

export class CreateFieldsRoleDonatorDto {
  @IsString()
  @IsNotEmpty()
  nameBusiness!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}\.\d{3}\.\d{003}\/\d{4}\-\d{2}$/, {
    message: "cnpj must be in the format 00.000.000/0000-00",
  })
  cnpj!: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty()
  @IsObject()
  address!: CreateAddressDto;
}
