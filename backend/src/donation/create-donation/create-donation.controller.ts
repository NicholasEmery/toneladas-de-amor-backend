import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { CreateDonationService } from "./create-donation.service";
import { CreateDonationDto } from "../dto/createDonation/createDonation.dto";
import { ApiTags, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { Donation } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("Donation")
@Controller("create-donation")
export class CreateDonationController {
  constructor(private readonly createDonationService: CreateDonationService) {}

  @ApiBody({
    description: "Exemplo de criação de doação",
    required: true,
    schema: { $ref: "#/components/schemas/CreateDonationDto" },
    examples: {
      "Doação Recorrente": {
        summary: "Doação Recorrente",
        value: {
          userId: "ID",
          amount: 100,
          status: "PENDING",
          methodPayment: "CREDIT_CARD",
          isRecurring: {
            recurringDonation: true,
            dateInitiated: "2025-06-28",
            dateFinalized: "2025-07-28",
          },
        },
      },
      "Doação Instantânea": {
        summary: "Doação Instantânea",
        value: {
          userId: "ID",
          amount: 100,
          status: "PENDING",
          methodPayment: "CREDIT_CARD",
          isRecurring: {
            recurringDonation: false,
          },
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Post()
  async createDonation(
    @Body() createDonationDto: CreateDonationDto,
  ): Promise<{ success: string; data: Pick<Donation, "id" | "userId">; statusCode: number }> {
    const donation = await this.createDonationService.createDonation(createDonationDto);
    return {
      success: "Donation created successfully.",
      data: {
        id: donation.id,
        userId: donation.userId,
      },
      statusCode: 201,
    };
  }
}
