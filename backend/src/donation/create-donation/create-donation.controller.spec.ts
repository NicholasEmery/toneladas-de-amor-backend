import { Test, TestingModule } from "@nestjs/testing";
import { CreateDonationController } from "./create-donation.controller";

describe("CreateDonationController", () => {
  let controller: CreateDonationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateDonationController],
    }).compile();

    controller = module.get<CreateDonationController>(CreateDonationController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
