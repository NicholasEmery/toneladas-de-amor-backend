import { IsMongoId, IsOptional, IsString } from "class-validator";

export class GetDonationDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  userId?: string;
}
