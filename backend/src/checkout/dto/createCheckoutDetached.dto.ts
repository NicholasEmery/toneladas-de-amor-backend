import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  Min,
  ValidateNested,
} from "class-validator";
import { FieldsCustomerDataDto } from "./fieldsCustomerData/fieldsCustomerData.dto";
import { FieldsItemsDto } from "./fieldsItems/fieldsItems.dto";
import { Type } from "class-transformer";
import { FieldsCallBackDto } from "./fieldsCallBack/fieldsCallBack.dto";
import { ApiProperty } from "@nestjs/swagger";

enum BillingType {
  CREDIT_CARD = "CREDIT_CARD",
}

enum ChargeType {
  DETACHED = "DETACHED",
  RECURRENT = "RECURRENT",
}

export class CreateCheckoutDetachedDto {
  @ApiProperty({
    description: "Tipo de cobrança. Atualmente apenas CREDIT_CARD é suportado.",
    example: BillingType.CREDIT_CARD,
    enum: BillingType,
  })
  @IsEnum(BillingType)
  billingTypes!: BillingType;

  @ApiProperty({
    description: "Tipo de charge. Pode ser DETACHED ou RECURRENT.",
    example: ChargeType.DETACHED,
    enum: ChargeType,
  })
  @IsEnum(ChargeType)
  @IsNotEmpty()
  chargeTypes!: ChargeType;

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
    description:
      "Itens do checkout, incluindo detalhes como ID, nome, quantidade e valor.",
    type: FieldsItemsDto,
  })
  @ValidateNested()
  @Type(() => FieldsItemsDto)
  @IsNotEmpty()
  @IsObject()
  items!: FieldsItemsDto;

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
