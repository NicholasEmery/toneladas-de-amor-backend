import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { GetDonationDto } from "../dto/getDonation/getDonation.dto";
import { GetDonationService } from "./get-donation.service";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags("Donation")
@Controller("get-donation")
export class GetDonationController {
  constructor(private readonly getDonationService: GetDonationService) {}

  @ApiQuery({
    name: "userId",
    required: false,
  })
  @Get()
  @HttpCode(200)
  async getDonation(@Query() getDonationDto: GetDonationDto) {
    const donation = await this.getDonationService.getDonation(getDonationDto);
    return {
      success: "Donation retrieved successfully.",
      data: donation,
      statusCode: 200,
    };
  }
}
