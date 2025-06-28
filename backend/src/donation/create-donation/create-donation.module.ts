import { Module } from "@nestjs/common";
import { CreateDonationService } from "./create-donation.service";
import { CreateDonationController } from "./create-donation.controller";

@Module({
  exports: [CreateDonationService, CreateDonationController],
  controllers: [CreateDonationController],
  providers: [CreateDonationService, CreateDonationController],
})
export class CreateDonationModule {}
