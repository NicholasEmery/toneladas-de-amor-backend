import { Module } from "@nestjs/common";
import { UpdateDonationService } from "./update-donation.service";
import { UpdateDonationController } from "./update-donation.controller";

@Module({
  exports: [UpdateDonationService, UpdateDonationController],
  controllers: [UpdateDonationController],
  providers: [UpdateDonationService, UpdateDonationController],
})
export class UpdateDonationModule {}
