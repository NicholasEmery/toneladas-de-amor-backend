import { Status } from "@prisma/client";
import { IsMongoId, IsNotEmpty, IsString, Matches } from "class-validator";

export class UpdateDonationDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  donationId!: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId!: string;

  @IsNotEmpty()
  @Matches(/^COMPLETED|FAILED$/, {
    message: "Status must be 'COMPLETED' or 'FAILED'",
  })
  status!: Status;
}
