import { Body, Controller, HttpCode, Patch } from "@nestjs/common";
import { UpdateDonationDto } from "../dto/updateDonation/updateDonation.dto";
import { UpdateDonationService } from "./update-donation.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Donation")
@Controller("update-donation")
export class UpdateDonationController {
  constructor(private readonly updateDonationService: UpdateDonationService) {}

  @Patch("")
  @HttpCode(200)
  async updateDonation(@Body() updateDonationDto: UpdateDonationDto) {
    await this.updateDonationService.updateonation(updateDonationDto);
    return {
      success: "Donation updated successfully.",
      statusCode: 200,
    };
  }
}
