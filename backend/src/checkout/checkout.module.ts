import { Module } from "@nestjs/common";
import { CheckoutService } from "./checkout.service";
import { AsaasApiService } from "../common/asaas-api.service";
import { HttpModule } from "@nestjs/axios";
import { CheckoutController } from "./checkout.controller";

@Module({
  imports: [HttpModule],
  providers: [CheckoutService, AsaasApiService],
  controllers: [CheckoutController],
  exports: [CheckoutService],
})
export class CheckoutModule {}
