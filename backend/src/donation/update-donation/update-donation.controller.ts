import { Body, Controller, HttpCode, Patch, UseGuards } from "@nestjs/common";
import { UpdateDonationDto } from "../dto/updateDonation/updateDonation.dto";
import { UpdateDonationService } from "./update-donation.service";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("Donation")
@Controller("update-donation")
export class UpdateDonationController {
  constructor(private readonly updateDonationService: UpdateDonationService) {}

  @ApiBody({
    description: "Exemplo de atualização de doação",
    required: true,
    schema: { $ref: "#/components/schemas/UpdateDonationDto" },
    examples: {
      "Atualização de Doação": {
        summary: "Atualização de Doação",
        value: {
          donationId: "Donation ID",
          userId: "User ID",
          status: "COMFIRMED",
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Patch()
  async updateDonation(@Body() updateDonationDto: UpdateDonationDto): Promise<{
    success: string;
    statusCode: number;
  }> {
    await this.updateDonationService.updateonation(updateDonationDto);
    return {
      success: "Donation updated successfully.",
      statusCode: 200,
    };
  }
}
