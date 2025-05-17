import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from "@nestjs/swagger";

const checkoutExample = {
    billingTypes: ["PIX", "CREDIT_CARD"],
    chargeTypes: ["DETACHED"],
    items: [
        {
            description: "Doação",
            quantity: 1,
            price: 100
        }
    ],
    customer: {
        name: "João da Silva",
        email: "joao@email.com",
        cpfCnpj: "12345678909",
        phone: "11999999999"
    }
};

@ApiTags("payment")
@ApiBearerAuth()
@Controller("payment")
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @UseGuards(AuthGuard)
    @Post("checkout")
    @ApiOperation({ summary: "Cria um checkout de pagamento" })
    @ApiBody({
        description: "Dados do checkout, incluindo billingTypes, chargeTypes, items, etc.",
        type: Object,
        examples: {
            default: {
                summary: "Exemplo de checkout",
                value: checkoutExample
            }
        }
    })
    async createCheckout(@Body() body: any) {
        return this.paymentService.createCheckout(body);
    }

    @UseGuards(AuthGuard)
    @Post("checkout/pix")
    @ApiOperation({ summary: "Cria um checkout de pagamento via PIX" })
    @ApiBody({
        description: "Dados do checkout. billingTypes será forçado para ['PIX'].",
        type: Object,
        examples: {
            default: {
                summary: "Exemplo de checkout PIX",
                value: { ...checkoutExample, billingTypes: ["PIX"] }
            }
        }
    })
    async createPixCheckout(@Body() body: any) {
        body.billingTypes = ["PIX"];
        return this.paymentService.createCheckout(body);
    }

    @UseGuards(AuthGuard)
    @Post("checkout/credit-card")
    @ApiOperation({ summary: "Cria um checkout de pagamento via cartão de crédito à vista" })
    @ApiBody({
        description: "Dados do checkout. billingTypes será forçado para ['CREDIT_CARD'] e chargeTypes para ['DETACHED'].",
        type: Object,
        examples: {
            default: {
                summary: "Exemplo de checkout cartão de crédito à vista",
                value: { ...checkoutExample, billingTypes: ["CREDIT_CARD"], chargeTypes: ["DETACHED"] }
            }
        }
    })
    async createCreditCardCheckout(@Body() body: any) {
        body.billingTypes = ["CREDIT_CARD"];
        body.chargeTypes = ["DETACHED"];
        return this.paymentService.createCheckout(body);
    }

    @UseGuards(AuthGuard)
    @Post("checkout/credit-card/installment")
    @ApiOperation({ summary: "Cria um checkout de pagamento via cartão de crédito parcelado" })
    @ApiBody({
        description: "Dados do checkout. billingTypes será forçado para ['CREDIT_CARD'] e chargeTypes para ['INSTALLMENT'].",
        type: Object,
        examples: {
            default: {
                summary: "Exemplo de checkout cartão de crédito parcelado",
                value: { ...checkoutExample, billingTypes: ["CREDIT_CARD"], chargeTypes: ["INSTALLMENT"] }
            }
        }
    })
    async createInstallmentCheckout(@Body() body: any) {
        body.billingTypes = ["CREDIT_CARD"];
        body.chargeTypes = ["INSTALLMENT"];
        return this.paymentService.createCheckout(body);
    }

    @UseGuards(AuthGuard)
    @Post("checkout/credit-card/recurrence")
    @ApiOperation({ summary: "Cria um checkout de pagamento recorrente via cartão de crédito" })
    @ApiBody({
        description: "Dados do checkout. billingTypes será forçado para ['CREDIT_CARD'] e chargeTypes para ['RECURRENT'].",
        type: Object,
        examples: {
            default: {
                summary: "Exemplo de checkout cartão de crédito recorrente",
                value: { ...checkoutExample, billingTypes: ["CREDIT_CARD"], chargeTypes: ["RECURRENT"] }
            }
        }
    })
    async createRecurrenceCheckout(@Body() body: any) {
        body.billingTypes = ["CREDIT_CARD"];
        body.chargeTypes = ["RECURRENT"];
        return this.paymentService.createCheckout(body);
    }
}
