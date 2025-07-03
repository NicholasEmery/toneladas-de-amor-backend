import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { GetBalanceService } from "./get-balance.service";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("finance")
export class GetBalanceController {
  constructor(private readonly getBalanceService: GetBalanceService) {}

  @UseGuards(AuthGuard)
  @Get("balance")
  @HttpCode(200)
  @ApiOperation({
    summary: "Obtém o saldo da conta Asaas",
  })
  @ApiOkResponse({
    description: "Retorna o saldo da conta Asaas",
    schema: {
      type: "object",
      properties: {
        balance: {
          type: "number",
          example: 100.0,
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "Erro ao obter o saldo da conta Asaas",
    schema: {
      type: "object",
      properties: {
        success: { type: "boolean", example: false },
        message: { type: "string", example: "Erro ao obter o saldo da conta Asaas" },
        error: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  code: { type: "string", example: "error_code" },
                  description: { type: "string", example: "Detailed error description" },
                },
              },
            },
          },
        },
      },
    },
  })
  async getBalance() {
    return this.getBalanceService.getBalance();
  }
}
