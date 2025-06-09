import { Controller, Post, Body, UseGuards, Param } from "@nestjs/common";
import { CheckoutService } from "./checkout.service";
import { AuthGuard } from "../auth/auth.guard";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from "@nestjs/swagger";
import { CreateCheckoutDetachedDto } from "./dto/createCheckoutDetached.dto";
import { CreateCheckoutRecurrentDto } from "./dto/createCheckoutRecurrent.dto";
import { CancelCheckoutByIdDto } from "./dto/cancelCheckoutById.dto";

@ApiBearerAuth()
@Controller("checkout")
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @UseGuards(AuthGuard)
  @Post("create/payment/credit-card/detached")
  @ApiOperation({ summary: "Cria um checkout de pagamento" })
  @ApiBody({
    description:
      "Corpo da requisição para criar um checkout de pagamento avulso via cartão de crédito. Utilize a estrutura do DTO fornecido para enviar todas as informações obrigatórias de pagamento, cliente e itens.",
    type: CreateCheckoutDetachedDto,
    examples: {
      default: {
        summary: "Exemplo de checkout do Tipo DETACHED",
        value: CreateCheckoutDetachedDto,
      },
    },
  })
  async createCheckout(@Body() body: CreateCheckoutDetachedDto) {
    return this.checkoutService.createDetachedCheckout(body);
  }

  @UseGuards(AuthGuard)
  @Post("create/payment/credit-card/recurrence")
  @ApiOperation({
    summary: "Cria um checkout de pagamento recorrente via cartão de crédito",
  })
  @ApiBody({
    description:
      "Corpo da requisição para criar um checkout de pagamento recorrente via cartão de crédito. Utilize a estrutura do DTO fornecido para enviar todas as informações obrigatórias de pagamento, cliente e itens.",
    type: CreateCheckoutRecurrentDto,
    examples: {
      default: {
        summary: "Exemplo de checkout cartão de crédito recorrente",
        value: CreateCheckoutRecurrentDto,
      },
    },
  })
  async createRecurrenceCheckout(@Body() body: CreateCheckoutRecurrentDto) {
    return this.checkoutService.createRecurrentCheckout(body);
  }

  @UseGuards(AuthGuard)
  @Post("cancel/payment/:id")
  @ApiOperation({ summary: "Cancela um checkout de pagamento" })
  @ApiBody({
    description: "ID do checkout a ser cancelado",
    type: CancelCheckoutByIdDto,
    examples: {
      default: {
        summary: "Exemplo de cancelamento de checkout",
        value: { id: "12345" },
      },
    },
  })
  async cancelCheckout(@Param("id") id: CancelCheckoutByIdDto) {
    return this.checkoutService.cancelCheckout(id);
  }
}
