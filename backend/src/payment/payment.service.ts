// ...existing code...
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class PaymentService {
  constructor(private readonly httpService: HttpService) {}

  async createCheckout(data: Record<string, unknown>) {
    const url = "https://api-sandbox.asaas.com/v3/checkouts";
    const headers = {
      "Content-Type": "application/json",
      "access_token": process.env.ASAAS_API_KEY,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, { headers }),
      );
      return response.data;
    } catch (error: unknown) {
      const errorMsg = "Erro ao criar checkout";
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
