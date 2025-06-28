import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateDonationService } from "./create-donation.service";
import { CreateDonationDto } from "../dto/createDonation/createDonation.dto";
import { ApiTags, ApiBody } from "@nestjs/swagger";

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
  @Post("")
  @HttpCode(201)
  async createDonation(@Body() createDonationDto: CreateDonationDto) {
    await this.createDonationService.createDonation(createDonationDto);
    return {
      success: "Donation created successfully.",
      statusCode: 201,
    };
  }
}
