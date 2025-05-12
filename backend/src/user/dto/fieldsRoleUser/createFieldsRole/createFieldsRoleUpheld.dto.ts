import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Validate,
  ValidateNested,
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

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty()
  @IsObject()
  address!: CreateAddressDto;
}
