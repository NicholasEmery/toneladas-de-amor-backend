import { IsNotEmpty, IsBoolean, IsString, IsDateString, ValidateIf } from "class-validator";

export class RecurringDonationDto {
  @IsNotEmpty()
  @IsBoolean()
  recurringDonation!: boolean;

  @ValidateIf((o) => o.recurringDonation === true)
  @IsNotEmpty({ message: "dateInitiated é obrigatório quando recurringDonation for true" })
  @IsString()
  @IsDateString()
  dateInitiated?: string;

  @ValidateIf((o) => o.recurringDonation === true)
  @IsNotEmpty({ message: "dateFinalized é obrigatório quando recurringDonation for true" })
  @IsString()
  @IsDateString()
  dateFinalized?: string;
}
