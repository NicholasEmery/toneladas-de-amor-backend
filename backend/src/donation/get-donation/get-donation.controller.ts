import { Controller, Get, HttpCode, Query, UseGuards } from "@nestjs/common";
import { GetDonationDto } from "../dto/getDonation/getDonation.dto";
import { GetDonationService } from "./get-donation.service";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Donation } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("Donation")
@Controller("get-donation")
export class GetDonationController {
  constructor(private readonly getDonationService: GetDonationService) {}

  @ApiQuery({
    name: "userId",
    required: false,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get()
  async getDonation(@Query() getDonationDto: GetDonationDto): Promise<{
    success: string;
    data:
      | Omit<Donation, "id" | "userId" | "updatedAt" | "createdAt">
      | Omit<Donation, "id" | "userId" | "status" | "updatedAt" | "createdAt">[];
    statusCode: number;
  }> {
    const donation = await this.getDonationService.getDonation(getDonationDto);
    return {
      success: "Donation retrieved successfully.",
      data: donation,
      statusCode: 200,
    };
  }
}
