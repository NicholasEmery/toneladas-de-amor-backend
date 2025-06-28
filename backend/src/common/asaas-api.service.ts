import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class AsaasApiService {
  private readonly baseUrl: string = "https://api-sandbox.asaas.com/v3";

  constructor(private readonly httpService: HttpService) {}

  private getHeaders() {
    return {
      "accept": "application/json",
      "Content-Type": "application/json",
      "access_token": process.env.ASAAS_API_KEY,
    };
  }

  post<T = unknown, D = object>(endpoint: string, data: D) {
    return this.httpService.post<T>(`${this.baseUrl}${endpoint}`, data, {
      headers: this.getHeaders(),
    });
  }

  get<T = unknown>(endpoint: string, params?: Record<string, unknown>) {
    return this.httpService.get<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
      params,
    });
  }
}
