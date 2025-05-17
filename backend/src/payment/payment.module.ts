import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  controllers: [PaymentController],
  imports: [HttpModule],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
