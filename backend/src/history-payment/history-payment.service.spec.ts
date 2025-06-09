import { Test, TestingModule } from "@nestjs/testing";
import { HistoryPaymentService } from "./history-payment.service";

describe("HistoryPaymentService", () => {
  let service: HistoryPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryPaymentService],
    }).compile();

    service = module.get<HistoryPaymentService>(HistoryPaymentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
