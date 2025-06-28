import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsObject, Min, ValidateNested } from "class-validator";
import { FieldsCustomerDataDto } from "./fieldsCustomerData/fieldsCustomerData.dto";
import { FieldsItemsDto } from "./fieldsItems/fieldsItems.dto";
import { FieldsSubscriptionDto } from "./fieldsSubscription/fieldsSubscription.dto";
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

export class CreateCheckoutRecurrentDto {
  @ApiProperty({
    description: "Tipo de cobrança. Apenas CREDIT_CARD é suportado.",
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
    description: "Tipo de recorrência da cobrança.",
    example: [ChargeType.RECURRENT],
    isArray: true,
    enum: ChargeType,
    type: [String],
  })
  @IsEnum(ChargeType, { each: true })
  @IsArray()
  @IsNotEmpty()
  chargeTypes!: ChargeType[];

  @ApiProperty({
    description: "Minutos até a expiração do checkout. Mínimo de 10 minutos.",
    example: 15,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(10, {
    message: "The minutes to expire must be at least 10 minutes.",
  })
  minutesToExpire!: number;

  @ApiProperty({
    description: "Valor total da cobrança em centavos.",
    type: FieldsCallBackDto,
  })
  @ValidateNested()
  @Type(() => FieldsCallBackDto)
  @IsNotEmpty()
  @IsObject()
  callback!: FieldsCallBackDto;

  @ApiProperty({
    description: "Itens da cobrança.",
    isArray: true,
    type: FieldsItemsDto,
  })
  @ValidateNested()
  @Type(() => FieldsItemsDto)
  @IsNotEmpty()
  @IsArray()
  items!: FieldsItemsDto[];

  @ApiProperty({
    description: "Dados do cliente.",
    type: FieldsCustomerDataDto,
  })
  @ValidateNested()
  @Type(() => FieldsCustomerDataDto)
  @IsNotEmpty()
  @IsObject()
  customerData!: FieldsCustomerDataDto;

  @ApiProperty({
    description: "Dados da assinatura.",
    type: FieldsSubscriptionDto,
  })
  @ValidateNested()
  @Type(() => FieldsSubscriptionDto)
  @IsNotEmpty()
  @IsObject()
  subscription!: FieldsSubscriptionDto;
}
