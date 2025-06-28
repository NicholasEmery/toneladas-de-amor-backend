import { Test, TestingModule } from "@nestjs/testing";
import { GetDonationController } from "./get-donation.controller";

describe("GetDonationController", () => {
  let controller: GetDonationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetDonationController],
    }).compile();

    controller = module.get<GetDonationController>(GetDonationController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
