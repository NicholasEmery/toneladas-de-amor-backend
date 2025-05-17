// ...existing code...
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class PaymentService {
  constructor(private readonly httpService: HttpService) {}

  async createCheckout(data: any) {
    const url = "https://api.asaas.com/api/v3/checkouts";
    const headers = {
      "Content-Type": "application/json",
      "access_token": process.env.ASAAS_API_KEY,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, { headers }),
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: "Erro ao criar checkout",
        error: error.response?.data || error.message,
      };
    }
  }
}
// ...existing code...
