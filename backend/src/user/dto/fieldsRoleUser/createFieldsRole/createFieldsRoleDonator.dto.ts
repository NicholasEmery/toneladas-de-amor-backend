import { IsNotEmpty, IsObject, IsOptional, IsString, Length, Matches, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./createAddressUser/createAddress.dto";
import { Type } from "class-transformer";

export class CreateFieldsRoleDonatorDto {
  @IsString()
  @IsOptional()
  nameBusiness?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(PESSOAFISICA|PESSOAJURIDICA)$/, {
    message: "O campo deve ser PESSOAFISICA ou PESSOAJURIDICA",
  })
  typePerson!: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14, {
    message: "O campo deve conter entre 11 e 14 caracteres, aceitando tanto CPF quanto CNPJ",
  })
  cpfOrCnpj!: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty()
  @IsObject()
  address!: CreateAddressDto;
}
