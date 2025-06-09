import { Module } from "@nestjs/common";
import { HistoryPaymentService } from "./history-payment.service";
import { AsaasApiService } from "../common/asaas-api.service";
import { HttpModule } from "@nestjs/axios";
import { HistoryPaymentController } from "./history-payment.controller";

@Module({
  imports: [HttpModule],
  providers: [HistoryPaymentService, AsaasApiService],
  controllers: [HistoryPaymentController],
  exports: [HistoryPaymentService],
})
export class HistoryPaymentModule {}
