import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { AsaasApiService } from "src/common/asaas-api.service";

@Injectable()
export class GetBalanceService {
  constructor(private readonly asaasApiService: AsaasApiService) {}

  async getBalance() {
    try {
      const response = await firstValueFrom(this.asaasApiService.get("/finance/balance"));
      return response.data;
    } catch (error: unknown) {
      const errorMsg = "Erro ao obter o saldo da conta Asaas";
      let errorData = error;
      if (typeof error === "object" && error !== null && "response" in error) {
        // @ts-expect-error: acesso seguro para response.data
        errorData = error.response?.data || error;
      }
      return {
        success: false,
        message: errorMsg,
        error: errorData,
      };
    }
  }
}
