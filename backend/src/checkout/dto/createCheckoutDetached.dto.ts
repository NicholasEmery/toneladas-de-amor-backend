import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsObject, Min, ValidateNested } from "class-validator";
import { FieldsCustomerDataDto } from "./fieldsCustomerData/fieldsCustomerData.dto";
import { FieldsItemsDto } from "./fieldsItems/fieldsItems.dto";
import { Type } from "class-transformer";
import { FieldsCallBackDto } from "./fieldsCallBack/fieldsCallBack.dto";
import { ApiProperty } from "@nestjs/swagger";

enum BillingType {
  CREDIT_CARD = "CREDIT_CARD",
  PIX = "PIX",
}

enum ChargeType {
  DETACHED = "DETACHED",
  RECURRENT = "RECURRENT",
}

export class CreateCheckoutDetachedDto {
  @ApiProperty({
    description: "Tipos de cobrança aceitos. Pode ser CREDIT_CARD ou PIX.",
    example: [BillingType.CREDIT_CARD],
    isArray: true,
    enum: BillingType,
    type: [String],
  })
  @IsEnum(BillingType, { each: true })
  @IsArray()
  @IsNotEmpty()
  billingTypes!: BillingType[];

  @ApiProperty({
    description: "Tipo de charge. Pode ser DETACHED ou RECURRENT.",
    example: [ChargeType.DETACHED],
    isArray: true,
    enum: ChargeType,
    type: [String],
  })
  @IsEnum(ChargeType, { each: true })
  @IsArray()
  @IsNotEmpty()
  chargeTypes!: ChargeType[];

  @ApiProperty({
    description: "Minutos até expirar o checkout. Valor mínimo: 10.",
    example: 10,
    minimum: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(10, {
    message: "The minutes to expire must be at least 10 minutes.",
  })
  minutesToExpire!: number;

  @ApiProperty({
    description: "URL de retorno após a finalização do checkout.",
    type: FieldsCallBackDto,
  })
  @ValidateNested()
  @Type(() => FieldsCallBackDto)
  @IsNotEmpty()
  @IsObject()
  callback!: FieldsCallBackDto;

  @ApiProperty({
    description: "Itens do checkout, incluindo detalhes como ID, nome, quantidade e valor.",
    isArray: true,
    type: FieldsItemsDto,
  })
  @ValidateNested()
  @Type(() => FieldsItemsDto)
  @IsNotEmpty()
  @IsArray()
  items!: FieldsItemsDto[];

  @ApiProperty({
    description: "Dados do cliente, incluindo informações como nome e email.",
    type: FieldsCustomerDataDto,
  })
  @ValidateNested()
  @Type(() => FieldsCustomerDataDto)
  @IsNotEmpty()
  @IsObject()
  customerData!: FieldsCustomerDataDto;
}
