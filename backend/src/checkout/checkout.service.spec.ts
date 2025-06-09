import { Test, TestingModule } from "@nestjs/testing";
import { CheckoutService } from "./checkout.service";
import { AsaasApiService } from "../common/asaas-api.service";
import { of, throwError } from "rxjs";
import { CreateCheckoutDetachedDto } from "./dto/createCheckoutDetached.dto";
import { CreateCheckoutRecurrentDto } from "./dto/createCheckoutRecurrent.dto";

describe("CheckoutService", () => {
  let service: CheckoutService;
  let asaasApiService: AsaasApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,
        {
          provide: AsaasApiService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
    asaasApiService = module.get<AsaasApiService>(AsaasApiService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createDetachedCheckout", () => {
    it("should return data on success", async () => {
      const dto = {} as CreateCheckoutDetachedDto;
      const mockResponse = { data: { id: "123", status: "SUCCESS" } };
      (asaasApiService.post as jest.Mock).mockReturnValueOnce(of(mockResponse));
      const result = await service.createDetachedCheckout(dto);
      expect(result).toEqual(mockResponse.data);
    });

    it("should return error object on failure", async () => {
      const dto = {} as CreateCheckoutDetachedDto;
      const mockError = { response: { data: { error: "fail" } } };
      (asaasApiService.post as jest.Mock).mockReturnValueOnce(
        throwError(() => mockError),
      );
      const result = (await service.createDetachedCheckout(dto)) as {
        success: boolean;
        message: string;
        error: { error: string };
      };
      expect(result.success).toBe(false);
      expect(result.message).toBe("Erro ao criar checkout do tipo DETACHED");
      expect(result.error).toEqual({ error: "fail" });
    });
  });

  describe("createRecurrentCheckout", () => {
    it("should return data on success", async () => {
      const dto = {} as CreateCheckoutRecurrentDto;
      const mockResponse = { data: { id: "456", status: "SUCCESS" } };
      (asaasApiService.post as jest.Mock).mockReturnValueOnce(of(mockResponse));
      const result = await service.createRecurrentCheckout(dto);
      expect(result).toEqual(mockResponse.data);
    });

    it("should return error object on failure", async () => {
      const dto = {} as CreateCheckoutRecurrentDto;
      const mockError = { response: { data: { error: "fail" } } };
      (asaasApiService.post as jest.Mock).mockReturnValueOnce(
        throwError(() => mockError),
      );
      const result = (await service.createRecurrentCheckout(dto)) as {
        success: boolean;
        message: string;
        error: { error: string };
      };
      expect(result.success).toBe(false);
      expect(result.message).toBe("Erro ao criar checkout do tipo RECURRENT");
      expect(result.error).toEqual({ error: "fail" });
    });
  });
});
