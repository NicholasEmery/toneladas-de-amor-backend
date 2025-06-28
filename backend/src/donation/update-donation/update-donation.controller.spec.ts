import { Test, TestingModule } from "@nestjs/testing";
import { UpdateDonationController } from "./update-donation.controller";

describe("UpdateDonationController", () => {
  let controller: UpdateDonationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateDonationController],
    }).compile();

    controller = module.get<UpdateDonationController>(UpdateDonationController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
