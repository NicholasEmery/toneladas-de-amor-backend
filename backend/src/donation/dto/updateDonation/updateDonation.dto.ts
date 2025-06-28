import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";
import { IsMongoId, IsNotEmpty, IsString, Matches } from "class-validator";

export class UpdateDonationDto {
  @ApiProperty({
    default: "Donation ID",
    description: "ID of the donation to be updated",
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  donationId!: string;

  @ApiProperty({
    default: "User ID",
    description: "ID of the user making the donation",
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId!: string;

  @ApiProperty({
    default: "COMFIRMED",
    description: "Status of the donation",
  })
  @IsNotEmpty()
  @Matches(/^COMFIRMED|CANCELED$/, {
    message: "Status must be either 'COMFIRMED' or 'CANCELED'",
  })
  status!: Status;
}
