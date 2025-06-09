import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { CreateCheckoutRecurrentDto } from "./dto/createCheckoutRecurrent.dto";
import { AsaasApiService } from "../common/asaas-api.service";
import { CreateCheckoutDetachedDto } from "./dto/createCheckoutDetached.dto";
import { CancelCheckoutByIdDto } from "./dto/cancelCheckoutById.dto";

@Injectable()
export class CheckoutService {
  constructor(private readonly asaasApiService: AsaasApiService) {}

  async createDetachedCheckout(data: CreateCheckoutDetachedDto) {
    try {
      const response = await firstValueFrom(
        this.asaasApiService.post("/checkouts", data),
      );
      return response.data;
    } catch (error: unknown) {
      const errorMsg = "Erro ao criar checkout do tipo DETACHED";
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

  async createRecurrentCheckout(data: CreateCheckoutRecurrentDto) {
    try {
      const response = await firstValueFrom(
        this.asaasApiService.post("/checkouts", data),
      );
      return response.data;
    } catch (error: unknown) {
      const errorMsg = "Erro ao criar checkout do tipo RECURRENT";
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

  async cancelCheckout(id: CancelCheckoutByIdDto) {
    try {
      const response = await firstValueFrom(
        this.asaasApiService.post(`/checkouts/${id.id}/cancel`, {}),
      );
      return response.data;
    } catch (error: unknown) {
      const errorMsg = "Erro ao cancelar checkout";
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
