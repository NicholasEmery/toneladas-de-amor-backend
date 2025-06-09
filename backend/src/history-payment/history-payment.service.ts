import { Injectable } from "@nestjs/common";
import { AsaasApiService } from "../common/asaas-api.service";
import { firstValueFrom } from "rxjs";

@Injectable()
export class HistoryPaymentService {
  constructor(private readonly asaasApiService: AsaasApiService) {}

  async getReceivedPayments() {
    try {
      const response = await firstValueFrom(
        this.asaasApiService.get("/financialTransactions"),
      );
      return response.data;
    } catch (error: unknown) {
      const errorMsg = "Erro ao obter pagamentos recebidos";
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
