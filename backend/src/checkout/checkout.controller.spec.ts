import { Test, TestingModule } from "@nestjs/testing";
import { CheckoutController } from "./checkout.controller";
import { CheckoutService } from "./checkout.service";
import { CreateCheckoutDetachedDto } from "./dto/createCheckoutDetached.dto";
import { CreateCheckoutRecurrentDto } from "./dto/createCheckoutRecurrent.dto";
import { AuthGuard } from "../auth/auth.guard";

describe("CheckoutController", () => {
  let controller: CheckoutController;
  let service: CheckoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [
        {
          provide: CheckoutService,
          useValue: {
            createDetachedCheckout: jest.fn(),
            createRecurrentCheckout: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<CheckoutController>(CheckoutController);
    service = module.get<CheckoutService>(CheckoutService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("createCheckout", () => {
    it("should call service.createDetachedCheckout and return its result", async () => {
      const dto = {} as CreateCheckoutDetachedDto;
      const mockResult = { id: "1", status: "SUCCESS" };
      jest
        .spyOn(service, "createDetachedCheckout")
        .mockResolvedValueOnce(mockResult);
      const result = await controller.createCheckout(dto);
      expect(service.createDetachedCheckout).toHaveBeenCalledWith(dto);
      expect(result).toBe(mockResult);
    });
  });

  describe("createRecurrenceCheckout", () => {
    it("should call service.createRecurrentCheckout and return its result", async () => {
      const dto = {} as CreateCheckoutRecurrentDto;
      const mockResult = { id: "2", status: "SUCCESS" };
      jest
        .spyOn(service, "createRecurrentCheckout")
        .mockResolvedValueOnce(mockResult);
      const result = await controller.createRecurrenceCheckout(dto);
      expect(service.createRecurrentCheckout).toHaveBeenCalledWith(dto);
      expect(result).toBe(mockResult);
    });
  });
});
