import { Module } from "@nestjs/common";
import { GetDonationService } from "./get-donation.service";
import { GetDonationController } from "./get-donation.controller";

@Module({
  exports: [GetDonationService, GetDonationController],
  controllers: [GetDonationController],
  providers: [GetDonationService, GetDonationController],
})
export class GetDonationModule {}
