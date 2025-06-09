import { Test, TestingModule } from "@nestjs/testing";
import { HistoryPaymentController } from "./history-payment.controller";

describe("HistoryPaymentController", () => {
  let controller: HistoryPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryPaymentController],
    }).compile();

    controller = module.get<HistoryPaymentController>(HistoryPaymentController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
