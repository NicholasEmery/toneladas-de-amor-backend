import { Test, TestingModule } from "@nestjs/testing";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { AuthGuard } from "../auth/auth.guard";

describe("PaymentController", () => {
  let controller: PaymentController;
  let service: PaymentService;

  const mockPaymentService = {
    createCheckout: jest
      .fn()
      .mockResolvedValue({ success: true, id: "checkout-id" }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [{ provide: PaymentService, useValue: mockPaymentService }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
    jest.clearAllMocks();
  });

  it("deve criar checkout padrão", async () => {
    const body = {
      billingTypes: ["PIX"],
      items: [{ description: "Doação", price: 100 }],
    };
    const result = await controller.createCheckout(body);
    expect(result).toEqual({ success: true, id: "checkout-id" });
    expect(service.createCheckout).toHaveBeenCalledWith(body);
  });

  it("deve criar checkout PIX forçando billingTypes", async () => {
    const body = { billingTypes: ["CREDIT_CARD"] };
    await controller.createPixCheckout(body);
    expect(service.createCheckout).toHaveBeenCalledWith({
      billingTypes: ["PIX"],
    });
  });

  it("deve criar checkout cartão de crédito à vista forçando billingTypes e chargeTypes", async () => {
    const body = { billingTypes: ["PIX"], chargeTypes: ["DETACHED"] };
    await controller.createCreditCardCheckout(body);
    expect(service.createCheckout).toHaveBeenCalledWith({
      billingTypes: ["CREDIT_CARD"],
      chargeTypes: ["DETACHED"],
    });
  });

  it("deve criar checkout cartão de crédito parcelado forçando billingTypes e chargeTypes", async () => {
    const body = { billingTypes: ["PIX"], chargeTypes: ["INSTALLMENT"] };
    await controller.createInstallmentCheckout(body);
    expect(service.createCheckout).toHaveBeenCalledWith({
      billingTypes: ["CREDIT_CARD"],
      chargeTypes: ["INSTALLMENT"],
    });
  });

  it("deve criar checkout cartão de crédito recorrente forçando billingTypes e chargeTypes", async () => {
    const body = { billingTypes: ["PIX"], chargeTypes: ["RECURRENT"] };
    await controller.createRecurrenceCheckout(body);
    expect(service.createCheckout).toHaveBeenCalledWith({
      billingTypes: ["CREDIT_CARD"],
      chargeTypes: ["RECURRENT"],
    });
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
