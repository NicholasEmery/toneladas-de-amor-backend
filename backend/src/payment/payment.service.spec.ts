import { Test, TestingModule } from "@nestjs/testing";
import { PaymentService } from "./payment.service";
import { HttpService } from "@nestjs/axios";
import { of, throwError } from "rxjs";

describe("PaymentService", () => {
  let service: PaymentService;
  let httpService: HttpService;

  const mockHttpService = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    httpService = module.get<HttpService>(HttpService);
    jest.clearAllMocks();
  });

  it("deve criar checkout com sucesso", async () => {
    const mockResponse = { data: { id: "checkout-id", success: true } };
    mockHttpService.post.mockReturnValueOnce(of(mockResponse));
    const result = await service.createCheckout({ valor: 100 });
    expect(result).toEqual({ id: "checkout-id", success: true });
    expect(httpService.post).toHaveBeenCalled();
  });

  it("deve retornar erro customizado ao falhar", async () => {
    const mockError = { response: { data: { error: "fail" } } };
    mockHttpService.post.mockReturnValueOnce(throwError(() => mockError));
    const result = await service.createCheckout({ valor: 100 });
    expect(result.success).toBe(false);
    expect(result.message).toBe("Erro ao criar checkout");
    expect(result.error).toEqual({ error: "fail" });
  });
});
