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

export class CreateFieldsRoleColaboratorDto {
  @IsString()
  @IsNotEmpty()
  department!: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty()
  @IsObject()
  address!: CreateAddressDto;
}
