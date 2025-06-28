import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Length,
  ValidateNested,
  IsNumberString,
} from "class-validator";
import { CreateAddressDto } from "./createAddressUser/createAddress.dto";
import { Type } from "class-transformer";

export class CreateFieldsRoleUpheldDto {
  @IsString()
  @IsNotEmpty()
  employmentSituation!: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  numberOfPeopleInTheHousehold!: number;

  @IsString()
  @IsNotEmpty()
  @IsNumberString({ no_symbols: true }, { message: "CPF must be a valid number without symbols" })
  @Length(11, 11, {
    message: "CPF must be exactly 11 digits.",
  })
  cpf!: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty()
  @IsObject()
  address!: CreateAddressDto;
}
