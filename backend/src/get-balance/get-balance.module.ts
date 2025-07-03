import { Module } from "@nestjs/common";
import { GetBalanceService } from "./get-balance.service";
import { AsaasApiService } from "src/common/asaas-api.service";
import { HttpModule } from "@nestjs/axios";
import { GetBalanceController } from "./get-balance.controller";

@Module({
  imports: [HttpModule],
  providers: [GetBalanceService, AsaasApiService],
  controllers: [GetBalanceController],
  exports: [GetBalanceService],
})
export class GetBalanceModule {}
