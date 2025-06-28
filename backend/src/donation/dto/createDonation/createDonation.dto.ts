import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsString, Matches, ValidateNested } from "class-validator";
import { MethodPayment, Status } from "@prisma/client";
import { RecurringDonationDto } from "./recurringDonation/recurringDonation.dto";
import { Type } from "class-transformer";

export class CreateDonationDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  @Matches(/^PENDING$/, {
    message: "Status must be 'PENDING'",
  })
  status!: Status;

  @IsNotEmpty()
  @IsEnum(MethodPayment, {
    message: "MethodPayment must be one of 'CREDIT_CARD'",
  })
  methodPayment!: MethodPayment;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RecurringDonationDto)
  @IsObject()
  isRecurring!: RecurringDonationDto;
}
