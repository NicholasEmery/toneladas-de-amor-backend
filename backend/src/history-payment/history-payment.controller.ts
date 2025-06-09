import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { HistoryPaymentService } from "./history-payment.service";
import { ApiBearerAuth, ApiProperty } from "@nestjs/swagger";

@Controller("history-payment")
@ApiBearerAuth()
export class HistoryPaymentController {
  constructor(private readonly historyPaymentService: HistoryPaymentService) {}

  @ApiProperty({
    description: "Pegar pagamentos recebidos",
  })
  @UseGuards(AuthGuard)
  @Get("received")
  async getReceivedPayments() {
    return this.historyPaymentService.getReceivedPayments();
  }
}
